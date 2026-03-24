package postgres

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jules/lis/backend/core-api/internal/domain"
)

type patientRepository struct {
	db *pgxpool.Pool
}

func NewPatientRepository(db *pgxpool.Pool) domain.PatientRepository {
	return &patientRepository{db: db}
}

func (r *patientRepository) Save(ctx context.Context, p *domain.Patient) error {
	_, err := r.db.Exec(ctx,
		"INSERT INTO patients (patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
		p.ID, p.NamaLengkap, p.TanggalLahir, p.JenisKelamin, p.NomorIdentitas, p.NomorHP, p.Alamat, p.CreatedAt, p.UpdatedAt)
	return err
}

func (r *patientRepository) FindByIdentity(ctx context.Context, identity string) (*domain.Patient, error) {
	var p domain.Patient
	err := r.db.QueryRow(ctx,
		"SELECT patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat, created_at, updated_at FROM patients WHERE nomor_identitas = $1 AND deleted_at IS NULL",
		identity).Scan(&p.ID, &p.NamaLengkap, &p.TanggalLahir, &p.JenisKelamin, &p.NomorIdentitas, &p.NomorHP, &p.Alamat, &p.CreatedAt, &p.UpdatedAt)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}

func (r *patientRepository) FindByID(ctx context.Context, id uuid.UUID) (*domain.Patient, error) {
	var p domain.Patient
	err := r.db.QueryRow(ctx,
		"SELECT patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat, created_at, updated_at FROM patients WHERE patient_id = $1 AND deleted_at IS NULL",
		id).Scan(&p.ID, &p.NamaLengkap, &p.TanggalLahir, &p.JenisKelamin, &p.NomorIdentitas, &p.NomorHP, &p.Alamat, &p.CreatedAt, &p.UpdatedAt)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}

func (r *patientRepository) List(ctx context.Context) ([]domain.Patient, error) {
	rows, err := r.db.Query(ctx, "SELECT patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat, created_at, updated_at FROM patients WHERE deleted_at IS NULL")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var patients []domain.Patient
	for rows.Next() {
		var p domain.Patient
		if err := rows.Scan(&p.ID, &p.NamaLengkap, &p.TanggalLahir, &p.JenisKelamin, &p.NomorIdentitas, &p.NomorHP, &p.Alamat, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, err
		}
		patients = append(patients, p)
	}
	return patients, nil
}
