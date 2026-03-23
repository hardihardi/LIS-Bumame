package patient

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
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

func Create(ctx context.Context, db *pgxpool.Pool, p *Patient) error {
	p.ID = uuid.New()
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()

	_, err := db.Exec(ctx,
		"INSERT INTO patients (patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		p.ID, p.NamaLengkap, p.TanggalLahir, p.JenisKelamin, p.NomorIdentitas, p.NomorHP, p.Alamat)
	return err
}

func GetByID(ctx context.Context, db *pgxpool.Pool, id uuid.UUID) (*Patient, error) {
	var p Patient
	err := db.QueryRow(ctx,
		"SELECT patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat, created_at, updated_at FROM patients WHERE patient_id = $1 AND deleted_at IS NULL",
		id).Scan(&p.ID, &p.NamaLengkap, &p.TanggalLahir, &p.JenisKelamin, &p.NomorIdentitas, &p.NomorHP, &p.Alamat, &p.CreatedAt, &p.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func List(ctx context.Context, db *pgxpool.Pool) ([]Patient, error) {
	rows, err := db.Query(ctx, "SELECT patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat, created_at, updated_at FROM patients WHERE deleted_at IS NULL")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var patients []Patient
	for rows.Next() {
		var p Patient
		if err := rows.Scan(&p.ID, &p.NamaLengkap, &p.TanggalLahir, &p.JenisKelamin, &p.NomorIdentitas, &p.NomorHP, &p.Alamat, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, err
		}
		patients = append(patients, p)
	}
	return patients, nil
}
