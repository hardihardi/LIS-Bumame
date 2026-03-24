package postgres

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jules/lis/backend/core-api/internal/domain"
)

type resultRepository struct {
	db *pgxpool.Pool
}

func NewResultRepository(db *pgxpool.Pool) domain.ResultRepository {
	return &resultRepository{db: db}
}

func (r *resultRepository) Save(ctx context.Context, res *domain.Result) error {
	_, err := r.db.Exec(ctx,
		"INSERT INTO results (result_id, sample_id, parameter_name, value, unit, range_normal, flag, analyst_id, is_validated, result_data, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
		res.ID, res.SampleID, res.ParameterName, res.Value, res.Unit, res.RangeNormal, res.Flag, res.AnalystID, res.IsValidated, res.ResultData, res.CreatedAt, res.UpdatedAt)
	return err
}

func (r *resultRepository) Validate(ctx context.Context, id uuid.UUID, validatorID uuid.UUID, hash string) error {
	_, err := r.db.Exec(ctx,
		"UPDATE results SET is_validated = TRUE, validated_by = $1, validated_at = $2, hash_signature = $3, updated_at = $4 WHERE result_id = $5",
		validatorID, time.Now(), hash, time.Now(), id)
	return err
}

func (r *resultRepository) FindByID(ctx context.Context, id uuid.UUID) (*domain.Result, error) {
	var res domain.Result
	err := r.db.QueryRow(ctx, "SELECT result_id, sample_id, parameter_name, value, unit, range_normal, flag, analyst_id, validator_id, is_validated, validated_at, hash_signature, result_data, created_at, updated_at FROM results WHERE result_id = $1", id).
		Scan(&res.ID, &res.SampleID, &res.ParameterName, &res.Value, &res.Unit, &res.RangeNormal, &res.Flag, &res.AnalystID, &res.ValidatorID, &res.IsValidated, &res.ValidatedAt, &res.HashSignature, &res.ResultData, &res.CreatedAt, &res.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &res, nil
}

func (r *resultRepository) FindBySampleID(ctx context.Context, sampleID uuid.UUID) ([]domain.Result, error) {
	rows, err := r.db.Query(ctx, "SELECT result_id, sample_id, parameter_name, value, unit, range_normal, flag, analyst_id, validator_id, is_validated, validated_at, hash_signature, result_data, created_at, updated_at FROM results WHERE sample_id = $1", sampleID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []domain.Result
	for rows.Next() {
		var res domain.Result
		if err := rows.Scan(&res.ID, &res.SampleID, &res.ParameterName, &res.Value, &res.Unit, &res.RangeNormal, &res.Flag, &res.AnalystID, &res.ValidatorID, &res.IsValidated, &res.ValidatedAt, &res.HashSignature, &res.ResultData, &res.CreatedAt, &res.UpdatedAt); err != nil {
			return nil, err
		}
		results = append(results, res)
	}
	return results, nil
}
