package result

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Result struct {
	ID            uuid.UUID `json:"result_id"`
	SampleID      uuid.UUID `json:"sample_id"`
	ParameterName string    `json:"parameter_name"`
	Value         string    `json:"value"`
	Unit          string    `json:"unit"`
	RangeNormal   string    `json:"range_normal"`
	Flag          string    `json:"flag"`
	AnalystID     *uuid.UUID `json:"analyst_id,omitempty"`
	ValidatorID   *uuid.UUID `json:"validator_id,omitempty"`
	ValidatedAt   *time.Time `json:"validated_at,omitempty"`
	HashSignature string    `json:"hash_signature"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

func Create(ctx context.Context, db *pgxpool.Pool, r *Result) error {
	r.ID = uuid.New()
	r.CreatedAt = time.Now()
	r.UpdatedAt = time.Now()

	_, err := db.Exec(ctx,
		"INSERT INTO results (result_id, sample_id, parameter_name, value, unit, range_normal, flag, analyst_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		r.ID, r.SampleID, r.ParameterName, r.Value, r.Unit, r.RangeNormal, r.Flag, r.AnalystID)
	return err
}

func Validate(ctx context.Context, db *pgxpool.Pool, id uuid.UUID, validatorID uuid.UUID) error {
	validatedAt := time.Now()

	// Generate hash signature for anti-tampering
	var r Result
	err := db.QueryRow(ctx, "SELECT result_id, sample_id, parameter_name, value FROM results WHERE result_id = $1", id).
		Scan(&r.ID, &r.SampleID, &r.ParameterName, &r.Value)
	if err != nil {
		return err
	}

	data := fmt.Sprintf("%s-%s-%s-%s-%s", r.ID, r.SampleID, r.ParameterName, r.Value, validatedAt.String())
	hash := sha256.Sum256([]byte(data))
	signature := hex.EncodeToString(hash[:])

	_, err = db.Exec(ctx,
		"UPDATE results SET validator_id = $1, validated_at = $2, hash_signature = $3, updated_at = $4 WHERE result_id = $5",
		validatorID, validatedAt, signature, time.Now(), id)
	return err
}

func GetBySampleID(ctx context.Context, db *pgxpool.Pool, sampleID uuid.UUID) ([]Result, error) {
	rows, err := db.Query(ctx, "SELECT result_id, sample_id, parameter_name, value, unit, range_normal, flag, analyst_id, validator_id, validated_at, hash_signature, created_at, updated_at FROM results WHERE sample_id = $1", sampleID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []Result
	for rows.Next() {
		var r Result
		if err := rows.Scan(&r.ID, &r.SampleID, &r.ParameterName, &r.Value, &r.Unit, &r.RangeNormal, &r.Flag, &r.AnalystID, &r.ValidatorID, &r.ValidatedAt, &r.HashSignature, &r.CreatedAt, &r.UpdatedAt); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, nil
}
