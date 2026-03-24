package api_handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jules/lis/backend/core-api/internal/domain"
	"github.com/jules/lis/backend/core-api/internal/usecase"
)

type Handler struct {
	patientUC usecase.PatientUseCase
	sampleUC  usecase.SampleUseCase
	resultUC  usecase.ResultUseCase
}

func NewHandler(pUC usecase.PatientUseCase, sUC usecase.SampleUseCase, rUC usecase.ResultUseCase) *Handler {
	return &Handler{
		patientUC: pUC,
		sampleUC:  sUC,
		resultUC:  rUC,
	}
}

func (h *Handler) CreatePatient(c *gin.Context) {
	var req domain.CreatePatientRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	p, err := h.patientUC.CreatePatient(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, p)
}

func (h *Handler) ListPatients(c *gin.Context) {
	list, err := h.patientUC.ListPatients(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

func (h *Handler) CreateSample(c *gin.Context) {
	var s domain.Sample
	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.sampleUC.CreateSample(c.Request.Context(), &s); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, s)
}

func (h *Handler) UpdateSampleStatus(c *gin.Context) {
	id, _ := uuid.Parse(c.Param("id"))
	var input struct {
		Status domain.SampleStatus `json:"status"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.sampleUC.UpdateStatus(c.Request.Context(), id, input.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "updated"})
}

func (h *Handler) ListSamples(c *gin.Context) {
	list, err := h.sampleUC.ListSamples(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

func (h *Handler) CreateResult(c *gin.Context) {
	var r domain.Result
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.resultUC.CreateResult(c.Request.Context(), &r); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, r)
}

func (h *Handler) ValidateResult(c *gin.Context) {
	id, _ := uuid.Parse(c.Param("id"))
	var input struct {
		ValidatorID uuid.UUID `json:"validator_id"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.resultUC.ValidateResult(c.Request.Context(), id, input.ValidatorID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "validated"})
}

func (h *Handler) GetResultsBySample(c *gin.Context) {
	id, _ := uuid.Parse(c.Param("sample_id"))
	list, err := h.resultUC.GetResultsBySample(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}
