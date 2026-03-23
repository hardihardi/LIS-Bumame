package qrcode

import (
	"fmt"
	"os"
)

func GenerateVerificationURL(resultID string) string {
	baseURL := os.Getenv("VERIFICATION_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:3000/verify"
	}
	return fmt.Sprintf("%s/%s", baseURL, resultID)
}
