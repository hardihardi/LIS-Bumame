package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jules/lis/backend/core-api/internal/domain"
)

type auditRepository struct {
	db *pgxpool.Pool
}

func NewAuditRepository(db *pgxpool.Pool) domain.AuditRepository {
	return &auditRepository{db: db}
}

func (r *auditRepository) Save(ctx context.Context, l *domain.AuditLog) error {
	_, err := r.db.Exec(ctx,
		"INSERT INTO audit_logs (log_id, user_id, action, entity, entity_id, payload, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		l.ID, l.UserID, l.Action, l.Entity, l.EntityID, l.Payload, l.Timestamp)
	return err
}

func (r *auditRepository) List(ctx context.Context) ([]domain.AuditLog, error) {
	rows, err := r.db.Query(ctx, "SELECT log_id, user_id, action, entity, entity_id, payload, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT 100")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var logs []domain.AuditLog
	for rows.Next() {
		var l domain.AuditLog
		if err := rows.Scan(&l.ID, &l.UserID, &l.Action, &l.Entity, &l.EntityID, &l.Payload, &l.Timestamp); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, nil
}
