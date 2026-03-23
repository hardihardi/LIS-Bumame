package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jules/lis/backend/core-api/internal/auth"
	"github.com/jules/lis/backend/core-api/internal/db"
	"github.com/jules/lis/backend/core-api/internal/kafka"
	"github.com/jules/lis/backend/core-api/internal/patient"
	"github.com/jules/lis/backend/core-api/internal/sample"
)

func main() {
	pool, err := db.Connect()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer pool.Close()

	kafka.Init()

	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	api := r.Group("/api/v1")
	{
		api.POST("/register", func(c *gin.Context) {
			var input struct {
				Nama     string `json:"nama"`
				Email    string `json:"email"`
				Password string `json:"password"`
				Role     string `json:"role"`
			}
			if err := c.BindJSON(&input); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			user, err := auth.Register(context.Background(), pool, input.Nama, input.Email, input.Password, input.Role)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusCreated, user)
		})

		api.POST("/login", func(c *gin.Context) {
			var input struct {
				Email    string `json:"email"`
				Password string `json:"password"`
			}
			if err := c.BindJSON(&input); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			token, err := auth.Login(context.Background(), pool, input.Email, input.Password)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"token": token})
		})

		patients := api.Group("/patients")
		{
			patients.POST("/", func(c *gin.Context) {
				var p patient.Patient
				if err := c.BindJSON(&p); err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				if err := patient.Create(context.Background(), pool, &p); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				c.JSON(http.StatusCreated, p)
			})
			patients.GET("/", func(c *gin.Context) {
				list, err := patient.List(context.Background(), pool)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				c.JSON(http.StatusOK, list)
			})
		}

		samples := api.Group("/samples")
		{
			samples.POST("/", func(c *gin.Context) {
				var s sample.Sample
				if err := c.BindJSON(&s); err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				if err := sample.Create(context.Background(), pool, &s); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				kafka.Publish(context.Background(), "sample.created", s.ID.String(), s)
				c.JSON(http.StatusCreated, s)
			})
			samples.PATCH("/:id/status", func(c *gin.Context) {
				id, _ := uuid.Parse(c.Param("id"))
				var input struct {
					Status sample.Status `json:"status"`
				}
				if err := c.BindJSON(&input); err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				if err := sample.UpdateStatus(context.Background(), pool, id, input.Status); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				kafka.Publish(context.Background(), "sample.updated", id.String(), input)
				c.JSON(http.StatusOK, gin.H{"status": "updated"})
			})
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
