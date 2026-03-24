package usecase

import (
	"context"
	"crypto/sha256"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jules/lis/backend/core-api/internal/domain"
	"github.com/jules/lis/backend/core-api/internal/kafka"
)

type ResultUseCase interface {
	CreateResult(ctx context.Context, r *domain.Result) error
	ValidateResult(ctx context.Context, id uuid.UUID, validatorID uuid.UUID) error
	GetResultsBySample(ctx context.Context, sampleID uuid.UUID) ([]domain.Result, error)
}

type resultUseCase struct {
	repo      domain.ResultRepository
	auditRepo domain.AuditRepository
}

func NewResultUseCase(repo domain.ResultRepository, auditRepo domain.AuditRepository) ResultUseCase {
	return &resultUseCase{repo: repo, auditRepo: auditRepo}
}

func (u *resultUseCase) CreateResult(ctx context.Context, r *domain.Result) error {
	r.ID = uuid.New()
	r.IsValidated = false
	r.CreatedAt = time.Now()
	r.UpdatedAt = time.Now()
	if err := u.repo.Save(ctx, r); err != nil {
		return err
	}
	kafka.Publish(ctx, "result.generated", r.ID.String(), r)

	_ = u.auditRepo.Save(ctx, &domain.AuditLog{
		ID:        uuid.New(),
		Action:    "CREATE",
		Entity:    "RESULT",
		EntityID:  &r.ID,
		Payload:   r,
		Timestamp: time.Now(),
	})

	return nil
}

func (u *resultUseCase) ValidateResult(ctx context.Context, id uuid.UUID, validatorID uuid.UUID) error {
	res, err := u.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}

	// Generate Anti-tampering Hash (SHA256)
	raw := fmt.Sprintf("%s|%s|%s|%s", res.ID, res.SampleID, res.ParameterName, res.Value)
	h := sha256.New()
	h.Write([]byte(raw))
	hash := fmt.Sprintf("%x", h.Sum(nil))

	if err := u.repo.Validate(ctx, id, validatorID, hash); err != nil {
		return err
	}
	kafka.Publish(ctx, "result.validated", id.String(), map[string]any{"status": "validated", "hash": hash})

	_ = u.auditRepo.Save(ctx, &domain.AuditLog{
		ID:        uuid.New(),
		UserID:    &validatorID,
		Action:    "VALIDATE",
		Entity:    "RESULT",
		EntityID:  &id,
		Payload:   map[string]string{"hash": hash},
		Timestamp: time.Now(),
	})

	return nil
}

func (u *resultUseCase) GetResultsBySample(ctx context.Context, sampleID uuid.UUID) ([]domain.Result, error) {
	return u.repo.FindBySampleID(ctx, sampleID)
}
