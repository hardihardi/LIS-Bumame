package audit

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Log struct {
	ID        uuid.UUID   `json:"log_id"`
	UserID    *uuid.UUID  `json:"user_id,omitempty"`
	Action    string      `json:"action"`
	Entity    string      `json:"entity"`
	EntityID  *uuid.UUID  `json:"entity_id,omitempty"`
	Payload   interface{} `json:"payload"`
	Timestamp time.Time   `json:"timestamp"`
}

func Create(ctx context.Context, db *pgxpool.Pool, l *Log) error {
	l.ID = uuid.New()
	l.Timestamp = time.Now()

	_, err := db.Exec(ctx,
		"INSERT INTO audit_logs (log_id, user_id, action, entity, entity_id, payload) VALUES ($1, $2, $3, $4, $5, $6)",
		l.ID, l.UserID, l.Action, l.Entity, l.EntityID, l.Payload)
	return err
}

func List(ctx context.Context, db *pgxpool.Pool) ([]Log, error) {
	rows, err := db.Query(ctx, "SELECT log_id, user_id, action, entity, entity_id, payload, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT 100")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var logs []Log
	for rows.Next() {
		var l Log
		if err := rows.Scan(&l.ID, &l.UserID, &l.Action, &l.Entity, &l.EntityID, &l.Payload, &l.Timestamp); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, nil
}
