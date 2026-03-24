package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type Patient struct {
	ID             uuid.UUID  `json:"patient_id"`
	NamaLengkap    string     `json:"nama_lengkap"`
	TanggalLahir   time.Time  `json:"tanggal_lahir"`
	JenisKelamin   string     `json:"jenis_kelamin"`
	NomorIdentitas string     `json:"nomor_identitas"`
	NomorHP        string     `json:"nomor_hp"`
	Alamat         string     `json:"alamat"`
	CreatedAt      time.Time  `json:"created_at"`
	UpdatedAt      time.Time  `json:"updated_at"`
	DeletedAt      *time.Time `json:"deleted_at,omitempty"`
}

type CreatePatientRequest struct {
	NamaLengkap    string    `json:"nama_lengkap" binding:"required"`
	TanggalLahir   time.Time `json:"tanggal_lahir" binding:"required"`
	JenisKelamin   string    `json:"jenis_kelamin" binding:"required"`
	NomorIdentitas string    `json:"nomor_identitas" binding:"required"`
	NomorHP        string    `json:"nomor_hp"`
	Alamat         string    `json:"alamat"`
}

type PatientRepository interface {
	Save(ctx context.Context, p *Patient) error
	FindByIdentity(ctx context.Context, identity string) (*Patient, error)
	FindByID(ctx context.Context, id uuid.UUID) (*Patient, error)
	List(ctx context.Context) ([]Patient, error)
}
