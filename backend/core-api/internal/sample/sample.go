package sample

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Status string

const (
	StatusRegistered Status = "REGISTERED"
	StatusCollected  Status = "COLLECTED"
	StatusInProcess  Status = "IN_PROCESS"
	StatusCompleted  Status = "COMPLETED"
	StatusValidated  Status = "VALIDATED"
)

type Sample struct {
	ID               uuid.UUID `json:"sample_id"`
	PatientID        uuid.UUID `json:"patient_id"`
	JenisTest        string    `json:"jenis_test"`
	WaktuPengambilan time.Time `json:"waktu_pengambilan"`
	Status           Status    `json:"status"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

func Create(ctx context.Context, db *pgxpool.Pool, s *Sample) error {
	s.ID = uuid.New()
	s.Status = StatusRegistered
	s.CreatedAt = time.Now()
	s.UpdatedAt = time.Now()

	_, err := db.Exec(ctx,
		"INSERT INTO samples (sample_id, patient_id, jenis_test, waktu_pengambilan, status) VALUES ($1, $2, $3, $4, $5)",
		s.ID, s.PatientID, s.JenisTest, s.WaktuPengambilan, s.Status)
	return err
}

func UpdateStatus(ctx context.Context, db *pgxpool.Pool, id uuid.UUID, status Status) error {
	_, err := db.Exec(ctx, "UPDATE samples SET status = $1, updated_at = $2 WHERE sample_id = $3",
		status, time.Now(), id)
	return err
}

func GetByPatientID(ctx context.Context, db *pgxpool.Pool, patientID uuid.UUID) ([]Sample, error) {
	rows, err := db.Query(ctx, "SELECT sample_id, patient_id, jenis_test, waktu_pengambilan, status, created_at, updated_at FROM samples WHERE patient_id = $1", patientID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var samples []Sample
	for rows.Next() {
		var s Sample
		if err := rows.Scan(&s.ID, &s.PatientID, &s.JenisTest, &s.WaktuPengambilan, &s.Status, &s.CreatedAt, &s.UpdatedAt); err != nil {
			return nil, err
		}
		samples = append(samples, s)
	}
	return samples, nil
}
