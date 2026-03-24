package api_handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jules/lis/backend/core-api/internal/auth"
)

type AuthHandler struct {
	db *pgxpool.Pool
}

func NewAuthHandler(db *pgxpool.Pool) *AuthHandler {
	return &AuthHandler{db: db}
}

func (h *AuthHandler) Register(c *gin.Context) {
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
	user, err := auth.Register(c.Request.Context(), h.db, input.Nama, input.Email, input.Password, input.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, user)
}

func (h *AuthHandler) Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	token, err := auth.Login(c.Request.Context(), h.db, input.Email, input.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}
