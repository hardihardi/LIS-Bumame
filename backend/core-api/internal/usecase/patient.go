package usecase

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jules/lis/backend/core-api/internal/domain"
)

type PatientUseCase interface {
	CreatePatient(ctx context.Context, req domain.CreatePatientRequest) (*domain.Patient, error)
	ListPatients(ctx context.Context) ([]domain.Patient, error)
}

type patientUseCase struct {
	repo      domain.PatientRepository
	auditRepo domain.AuditRepository
}

func NewPatientUseCase(repo domain.PatientRepository, auditRepo domain.AuditRepository) PatientUseCase {
	return &patientUseCase{repo: repo, auditRepo: auditRepo}
}

func (s *patientUseCase) CreatePatient(ctx context.Context, req domain.CreatePatientRequest) (*domain.Patient, error) {
	existing, err := s.repo.FindByIdentity(ctx, req.NomorIdentitas)
	if err != nil {
		return nil, fmt.Errorf("failed checking identity: %w", err)
	}

	if existing != nil {
		return nil, errors.New("patient already exists with this identity number")
	}

	patient := &domain.Patient{
		ID:             uuid.New(),
		NamaLengkap:    req.NamaLengkap,
		TanggalLahir:   req.TanggalLahir,
		JenisKelamin:   req.JenisKelamin,
		NomorIdentitas: req.NomorIdentitas,
		NomorHP:        req.NomorHP,
		Alamat:         req.Alamat,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	if err := s.repo.Save(ctx, patient); err != nil {
		return nil, fmt.Errorf("failed saving patient: %w", err)
	}

	_ = s.auditRepo.Save(ctx, &domain.AuditLog{
		ID:        uuid.New(),
		Action:    "CREATE",
		Entity:    "PATIENT",
		EntityID:  &patient.ID,
		Payload:   req,
		Timestamp: time.Now(),
	})

	return patient, nil
}

func (s *patientUseCase) ListPatients(ctx context.Context) ([]domain.Patient, error) {
	return s.repo.List(ctx)
}
