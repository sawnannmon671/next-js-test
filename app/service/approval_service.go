package service

import (
	"context"
	"fmt"

	"go-grpc/api/approval"
	"go-grpc/app/models"
	"go-grpc/database"

	"github.com/google/uuid"
)

type ApprovalStatusServer struct {
	approval.UnimplementedApprovalStatusServiceServer
}

func (s *ApprovalStatusServer) GetApprovalStatusList(ctx context.Context, req *approval.Empty) (*approval.ApprovalStatusListResponse, error) {
	var statuses []models.ApprovalStatus
	err := database.BunDB.NewSelect().Model(&statuses).Order("created_at DESC").Scan(ctx)
	if err != nil {
		return nil, err
	}

	var pbStatuses []*approval.ApprovalStatus
	for _, status := range statuses {
		pbStatuses = append(pbStatuses, &approval.ApprovalStatus{
			Id:           status.ID.String(),
			Name:         status.Name,
			ApprovalType: int32(status.ApprovalType),
			Status:       status.Status,
			Remark:       status.Remark,
			CreatedAt:    status.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:    status.UpdatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return &approval.ApprovalStatusListResponse{Statuses: pbStatuses}, nil
}

func (s *ApprovalStatusServer) CreateApprovalStatus(ctx context.Context, req *approval.CreateApprovalStatusRequest) (*approval.ApprovalStatusResponse, error) {
	newStatus := &models.ApprovalStatus{
		ID:           uuid.New(),
		Name:         req.Name,
		ApprovalType: int(req.ApprovalType),
		Status:       req.Status,
		Remark:       req.Remark,
	}

	_, err := database.BunDB.NewInsert().Model(newStatus).Exec(ctx)
	if err != nil {
		return &approval.ApprovalStatusResponse{
			Success: false,
			Message: fmt.Sprintf("Failed to create: %v", err),
		}, nil
	}

	return &approval.ApprovalStatusResponse{
		Success: true,
		Message: "Created successfully",
		Status: &approval.ApprovalStatus{
			Id:           newStatus.ID.String(),
			Name:         newStatus.Name,
			ApprovalType: int32(newStatus.ApprovalType),
			Status:       newStatus.Status,
			Remark:       newStatus.Remark,
		},
	}, nil
}

func (s *ApprovalStatusServer) UpdateApprovalStatus(ctx context.Context, req *approval.UpdateApprovalStatusRequest) (*approval.ApprovalStatusResponse, error) {
	id, err := uuid.Parse(req.Id)
	if err != nil {
		return nil, err
	}

	updateStatus := &models.ApprovalStatus{
		ID:           id,
		Name:         req.Name,
		ApprovalType: int(req.ApprovalType),
		Status:       req.Status,
		Remark:       req.Remark,
	}

	_, err = database.BunDB.NewUpdate().
		Model(updateStatus).
		Column("name", "approval_type", "status", "remark", "updated_at").
		Where("id = ?", id).
		Exec(ctx)

	if err != nil {
		return &approval.ApprovalStatusResponse{
			Success: false,
			Message: fmt.Sprintf("Failed to update: %v", err),
		}, nil
	}

	return &approval.ApprovalStatusResponse{
		Success: true,
		Message: "Updated successfully",
		Status: &approval.ApprovalStatus{
			Id:           updateStatus.ID.String(),
			Name:         updateStatus.Name,
			ApprovalType: int32(updateStatus.ApprovalType),
			Status:       updateStatus.Status,
			Remark:       updateStatus.Remark,
		},
	}, nil
}

func (s *ApprovalStatusServer) DeleteApprovalStatus(ctx context.Context, req *approval.DeleteApprovalStatusRequest) (*approval.DeleteApprovalStatusResponse, error) {
	id, err := uuid.Parse(req.Id)
	if err != nil {
		return nil, err
	}

	_, err = database.BunDB.NewDelete().
		Model((*models.ApprovalStatus)(nil)).
		Where("id = ?", id).
		Exec(ctx)

	if err != nil {
		return &approval.DeleteApprovalStatusResponse{
			Success: false,
			Message: fmt.Sprintf("Failed to delete: %v", err),
		}, nil
	}

	return &approval.DeleteApprovalStatusResponse{
		Success: true,
		Message: "Deleted successfully",
	}, nil
}
