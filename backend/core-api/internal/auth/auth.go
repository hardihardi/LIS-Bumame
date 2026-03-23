package auth

import (
	"context"
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret []byte

func init() {
	jwtSecret = []byte(os.Getenv("JWT_SECRET"))
	if len(jwtSecret) == 0 {
		jwtSecret = []byte("default_secret_change_me")
	}
}

type User struct {
	ID           uuid.UUID `json:"user_id"`
	Nama         string    `json:"nama"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Role         string    `json:"role"`
}

func Register(ctx context.Context, db *pgxpool.Pool, nama, email, password, role string) (*User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &User{
		ID:           uuid.New(),
		Nama:         nama,
		Email:        email,
		PasswordHash: string(hash),
		Role:         role,
	}

	_, err = db.Exec(ctx, "INSERT INTO users (user_id, nama, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)",
		user.ID, user.Nama, user.Email, user.PasswordHash, user.Role)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func Login(ctx context.Context, db *pgxpool.Pool, email, password string) (string, error) {
	var user User
	err := db.QueryRow(ctx, "SELECT user_id, nama, email, password_hash, role FROM users WHERE email = $1", email).
		Scan(&user.ID, &user.Nama, &user.Email, &user.PasswordHash, &user.Role)
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID.String(),
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	return token.SignedString(jwtSecret)
}
