package usecase

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jules/lis/backend/core-api/internal/domain"
	"github.com/jules/lis/backend/core-api/internal/kafka"
)

type SampleUseCase interface {
	CreateSample(ctx context.Context, s *domain.Sample) error
	UpdateStatus(ctx context.Context, id uuid.UUID, status domain.SampleStatus) error
	ListSamples(ctx context.Context) ([]domain.Sample, error)
}

type sampleUseCase struct {
	repo      domain.SampleRepository
	auditRepo domain.AuditRepository
}

func NewSampleUseCase(repo domain.SampleRepository, auditRepo domain.AuditRepository) SampleUseCase {
	return &sampleUseCase{repo: repo, auditRepo: auditRepo}
}

func (u *sampleUseCase) CreateSample(ctx context.Context, s *domain.Sample) error {
	s.ID = uuid.New()
	s.Status = domain.StatusRegistered
	s.CreatedAt = time.Now()
	s.UpdatedAt = time.Now()
	if err := u.repo.Save(ctx, s); err != nil {
		return err
	}
	kafka.Publish(ctx, "sample.created", s.ID.String(), s)

	_ = u.auditRepo.Save(ctx, &domain.AuditLog{
		ID:        uuid.New(),
		Action:    "CREATE",
		Entity:    "SAMPLE",
		EntityID:  &s.ID,
		Payload:   s,
		Timestamp: time.Now(),
	})

	return nil
}

func (u *sampleUseCase) UpdateStatus(ctx context.Context, id uuid.UUID, status domain.SampleStatus) error {
	if err := u.repo.UpdateStatus(ctx, id, status); err != nil {
		return err
	}
	kafka.Publish(ctx, "sample.updated", id.String(), map[string]any{"status": status})

	_ = u.auditRepo.Save(ctx, &domain.AuditLog{
		ID:        uuid.New(),
		Action:    "UPDATE_STATUS",
		Entity:    "SAMPLE",
		EntityID:  &id,
		Payload:   map[string]any{"status": status},
		Timestamp: time.Now(),
	})

	return nil
}

func (u *sampleUseCase) ListSamples(ctx context.Context) ([]domain.Sample, error) {
	return u.repo.List(ctx)
}
