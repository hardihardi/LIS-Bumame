package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type SampleStatus string

const (
	StatusRegistered SampleStatus = "REGISTERED"
	StatusCollected  SampleStatus = "COLLECTED"
	StatusInProcess  SampleStatus = "IN_PROCESS"
	StatusCompleted  SampleStatus = "COMPLETED"
	StatusValidated  SampleStatus = "VALIDATED"
)

type Sample struct {
	ID               uuid.UUID    `json:"sample_id"`
	PatientID        uuid.UUID    `json:"patient_id"`
	JenisTest        string       `json:"jenis_test"`
	Status           SampleStatus `json:"status"`
	WaktuPengambilan time.Time    `json:"waktu_pengambilan"`
	CreatedAt        time.Time    `json:"created_at"`
	UpdatedAt        time.Time    `json:"updated_at"`
}

type SampleRepository interface {
	Save(ctx context.Context, s *Sample) error
	UpdateStatus(ctx context.Context, id uuid.UUID, status SampleStatus) error
	FindByID(ctx context.Context, id uuid.UUID) (*Sample, error)
	List(ctx context.Context) ([]Sample, error)
}
