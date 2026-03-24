package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type AuditLog struct {
	ID        uuid.UUID   `json:"log_id"`
	UserID    *uuid.UUID  `json:"user_id,omitempty"`
	Action    string      `json:"action"`
	Entity    string      `json:"entity"`
	EntityID  *uuid.UUID  `json:"entity_id,omitempty"`
	Payload   any         `json:"payload"`
	Timestamp time.Time   `json:"timestamp"`
}

type AuditRepository interface {
	Save(ctx context.Context, l *AuditLog) error
	List(ctx context.Context) ([]AuditLog, error)
}
