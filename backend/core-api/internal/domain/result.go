package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type Result struct {
	ID            uuid.UUID `json:"result_id"`
	SampleID      uuid.UUID `json:"sample_id"`
	ParameterName string    `json:"parameter_name"`
	Value         string    `json:"value"`
	Unit          string    `json:"unit"`
	RangeNormal   string    `json:"range_normal"`
	Flag          string    `json:"flag"`
	AnalystID     uuid.UUID `json:"analyst_id"`
	ValidatorID   uuid.UUID `json:"validator_id"`
	IsValidated   bool      `json:"is_validated"`
	ValidatedAt   time.Time `json:"validated_at"`
	HashSignature string    `json:"hash_signature"`
	ResultData    any       `json:"result_data"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type ResultRepository interface {
	Save(ctx context.Context, r *Result) error
	Validate(ctx context.Context, id uuid.UUID, validatorID uuid.UUID, hash string) error
	FindByID(ctx context.Context, id uuid.UUID) (*Result, error)
	FindBySampleID(ctx context.Context, sampleID uuid.UUID) ([]Result, error)
}
