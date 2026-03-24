package postgres

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jules/lis/backend/core-api/internal/domain"
)

type sampleRepository struct {
	db *pgxpool.Pool
}

func NewSampleRepository(db *pgxpool.Pool) domain.SampleRepository {
	return &sampleRepository{db: db}
}

func (r *sampleRepository) Save(ctx context.Context, s *domain.Sample) error {
	_, err := r.db.Exec(ctx,
		"INSERT INTO samples (sample_id, patient_id, jenis_test, status, waktu_pengambilan, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		s.ID, s.PatientID, s.JenisTest, s.Status, s.WaktuPengambilan, s.CreatedAt, s.UpdatedAt)
	return err
}

func (r *sampleRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status domain.SampleStatus) error {
	_, err := r.db.Exec(ctx, "UPDATE samples SET status = $1, updated_at = $2 WHERE sample_id = $3", status, time.Now(), id)
	return err
}

func (r *sampleRepository) FindByID(ctx context.Context, id uuid.UUID) (*domain.Sample, error) {
	var s domain.Sample
	err := r.db.QueryRow(ctx, "SELECT sample_id, patient_id, jenis_test, status, waktu_pengambilan, created_at, updated_at FROM samples WHERE sample_id = $1", id).
		Scan(&s.ID, &s.PatientID, &s.JenisTest, &s.Status, &s.WaktuPengambilan, &s.CreatedAt, &s.UpdatedAt)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return &s, nil
}

func (r *sampleRepository) List(ctx context.Context) ([]domain.Sample, error) {
	rows, err := r.db.Query(ctx, "SELECT sample_id, patient_id, jenis_test, status, waktu_pengambilan, created_at, updated_at FROM samples ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var samples []domain.Sample
	for rows.Next() {
		var s domain.Sample
		if err := rows.Scan(&s.ID, &s.PatientID, &s.JenisTest, &s.Status, &s.WaktuPengambilan, &s.CreatedAt, &s.UpdatedAt); err != nil {
			return nil, err
		}
		samples = append(samples, s)
	}
	return samples, nil
}
