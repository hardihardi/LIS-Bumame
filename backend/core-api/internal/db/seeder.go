package db

import (
	"context"
	"crypto/sha256"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	connStr := "postgresql://neondb_owner:npg_KSZQ9aTc7wFY@ep-nameless-mouse-akonwxiu-pooler.c-3.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
	pool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer pool.Close()

	ctx := context.Background()

	// 1. Clear existing data (Careful: This is a seeder)
	log.Println("Cleaning up existing data...")
	pool.Exec(ctx, "DELETE FROM audit_logs")
	pool.Exec(ctx, "DELETE FROM results")
	pool.Exec(ctx, "DELETE FROM samples")
	pool.Exec(ctx, "DELETE FROM patients")
	pool.Exec(ctx, "DELETE FROM users")

	// 2. Seed Users
	log.Println("Seeding users...")
	passHash, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	roles := []string{"ADMIN", "PETUGAS", "ANALIS", "DOKTER"}
	userIDs := make(map[string]uuid.UUID)

	for _, role := range roles {
		id := uuid.New()
		userIDs[role] = id
		_, err := pool.Exec(ctx, "INSERT INTO users (user_id, nama, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)",
			id, fmt.Sprintf("%s Felix", role), fmt.Sprintf("%s@lab.com", role), string(passHash), role)
		if err != nil {
			log.Fatalf("Failed to seed user %s: %v", role, err)
		}
	}

	// 3. Seed Patients
	log.Println("Seeding patients...")
	patientNames := []string{
		"Budi Santoso", "Siti Aminah", "Ahmad Dahlan", "Dewi Sartika", "Joko Widodo",
		"Anies Baswedan", "Ganjar Pranowo", "Prabowo Subianto", "Gibran Rakabuming", "Mahfud MD",
		"Sri Mulyani", "Retno Marsudi", "Luhut Pandjaitan", "Erick Thohir", "Basuki Hadimuljono",
		"Sandiaga Uno", "Tri Rismaharini", "Khofifah Indar", "Ridwan Kamil", "Ganjar Pranowo",
	}

	patientIDs := []uuid.UUID{}
	for i, name := range patientNames {
		id := uuid.New()
		patientIDs = append(patientIDs, id)
		nik := fmt.Sprintf("3212%012d", i+1)
		_, err := pool.Exec(ctx, "INSERT INTO patients (patient_id, nama_lengkap, tanggal_lahir, jenis_kelamin, nomor_identitas, nomor_hp, alamat) VALUES ($1, $2, $3, $4, $5, $6, $7)",
			id, name, time.Date(1970+i, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC),
			[]string{"L", "P"}[rand.Intn(2)], nik, fmt.Sprintf("081234567%03d", i), "Jl. Merdeka No. "+fmt.Sprint(i+1))
		if err != nil {
			log.Fatalf("Failed to seed patient %s: %v", name, err)
		}
	}

	// 4. Seed Samples
	log.Println("Seeding samples...")
	testTypes := []string{"Hematologi Lengkap", "Kimia Klinik", "Urine Lengkap", "Imunologi Serologi", "PCR COVID-19"}
	statuses := []string{"REGISTERED", "COLLECTED", "IN_PROCESS", "COMPLETED", "VALIDATED"}

	sampleIDs := []uuid.UUID{}
	for i := 0; i < 50; i++ {
		sid := uuid.New()
		sampleIDs = append(sampleIDs, sid)
		pID := patientIDs[rand.Intn(len(patientIDs))]
		status := statuses[rand.Intn(len(statuses))]
		test := testTypes[rand.Intn(len(testTypes))]

		_, err := pool.Exec(ctx, "INSERT INTO samples (sample_id, patient_id, jenis_test, status, waktu_pengambilan) VALUES ($1, $2, $3, $4, $5)",
			sid, pID, test, status, time.Now().Add(-time.Duration(rand.Intn(48))*time.Hour))
		if err != nil {
			log.Fatalf("Failed to seed sample %d: %v", i, err)
		}
	}

	// 5. Seed Results
	log.Println("Seeding results...")
	params := map[string][]string{
		"Hematologi Lengkap": {"Hemoglobin", "Leukosit", "Trombosit"},
		"Kimia Klinik":        {"Glukosa Sewaktu", "Kolesterol Total", "Asam Urat"},
		"Urine Lengkap":       {"pH Urine", "Protein Urine", "Glukosa Urine"},
		"Imunologi Serologi":  {"HBsAg", "Anti-HCV"},
		"PCR COVID-19":       {"SARS-CoV-2 RNA"},
	}

	for _, sid := range sampleIDs {
		var test string
		pool.QueryRow(ctx, "SELECT jenis_test FROM samples WHERE sample_id = $1", sid).Scan(&test)

		for _, pName := range params[test] {
			rid := uuid.New()
			val := fmt.Sprintf("%.1f", rand.Float64()*20)
			if test == "PCR COVID-19" { val = []string{"NEGATIF", "POSITIF"}[rand.Intn(2)] }

			flag := "NORMAL"
			if rand.Intn(10) > 7 { flag = "ABNORMAL" }

			// Digital Signature
			raw := fmt.Sprintf("%s|%s|%s|%s", rid, sid, pName, val)
			h := sha256.New()
			h.Write([]byte(raw))
			hash := fmt.Sprintf("%x", h.Sum(nil))

			_, err := pool.Exec(ctx, "INSERT INTO results (result_id, sample_id, parameter_name, value, unit, range_normal, flag, analyst_id, is_validated, validated_by, hash_signature, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
				rid, sid, pName, val, "unit", "range", flag, userIDs["ANALIS"], flag == "NORMAL", userIDs["DOKTER"], hash, time.Now())
			if err != nil {
				log.Fatalf("Failed to seed result for sample %s: %v", sid, err)
			}
		}
	}

	// 6. Seed Audit Logs
	log.Println("Seeding audit logs...")
	for i := 0; i < 100; i++ {
		_, err := pool.Exec(ctx, "INSERT INTO audit_logs (log_id, user_id, action, entity, entity_id, timestamp) VALUES ($1, $2, $3, $4, $5, $6)",
			uuid.New(), userIDs["ADMIN"], "SYSTEM_SEED", "Seeder", uuid.Nil, time.Now().Add(-time.Duration(rand.Intn(24))*time.Hour))
		if err != nil {
			log.Fatalf("Failed to seed audit log %d: %v", i, err)
		}
	}

	log.Println("Database seeded successfully with comprehensive medical data.")
}
