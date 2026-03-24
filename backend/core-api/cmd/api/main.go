package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jules/lis/backend/core-api/internal/db"
	"github.com/jules/lis/backend/core-api/internal/delivery/api_handler"
	"github.com/jules/lis/backend/core-api/internal/kafka"
	"github.com/jules/lis/backend/core-api/internal/repository/postgres"
	"github.com/jules/lis/backend/core-api/internal/usecase"
)

func main() {
	pool, err := db.Connect()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer pool.Close()

	kafka.Init()

	// Initialize Repositories
	patientRepo := postgres.NewPatientRepository(pool)
	sampleRepo := postgres.NewSampleRepository(pool)
	resultRepo := postgres.NewResultRepository(pool)
	auditRepo := postgres.NewAuditRepository(pool)

	// Initialize UseCases
	patientUC := usecase.NewPatientUseCase(patientRepo, auditRepo)
	sampleUC := usecase.NewSampleUseCase(sampleRepo, auditRepo)
	resultUC := usecase.NewResultUseCase(resultRepo, auditRepo)

	// Initialize Handlers
	h := api_handler.NewHandler(patientUC, sampleUC, resultUC)
	authH := api_handler.NewAuthHandler(pool)

	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	api := r.Group("/api/v1")
	{
		api.POST("/register", authH.Register)
		api.POST("/login", authH.Login)

		patients := api.Group("/patients")
		{
			patients.POST("/", h.CreatePatient)
			patients.GET("/", h.ListPatients)
		}

		samples := api.Group("/samples")
		{
			samples.POST("/", h.CreateSample)
			samples.GET("/", h.ListSamples)
			samples.PATCH("/:id/status", h.UpdateSampleStatus)
		}

		results := api.Group("/results")
		{
			results.POST("/", h.CreateResult)
			results.GET("/sample/:sample_id", h.GetResultsBySample)
			results.POST("/:id/validate", h.ValidateResult)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
