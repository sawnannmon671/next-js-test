package service

import (
	"context"
	"fmt"

	"go-grpc-next-js-test/api/approval"
	"go-grpc-next-js-test/app/models"
	"go-grpc-next-js-test/database"

	"github.com/google/uuid"
)

type ApprovalStatusServer struct {
	approval.UnimplementedApprovalStatusServiceServer
}

func (s *ApprovalStatusServer) GetApprovalStatusList(ctx context.Context, req *approval.Empty) (*approval.ApprovalStatusListResponse, error) {
	var statuses []models.ApprovalStatus
	err := database.BunDB.NewSelect().Model(&statuses).Relation("Permissions").Order("created_at DESC").Scan(ctx)
	if err != nil {
		return nil, err
	}

	var pbStatuses []*approval.ApprovalStatus
	for _, status := range statuses {
		var permissionIds []string
		for _, p := range status.Permissions {
			permissionIds = append(permissionIds, p.ID.String())
		}
		pbStatuses = append(pbStatuses, &approval.ApprovalStatus{
			Id:            status.ID.String(),
			Name:          status.Name,
			ApprovalType:  int32(status.ApprovalType),
			Status:        status.Status,
			Remark:        status.Remark,
			CreatedAt:     status.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:     status.UpdatedAt.Format("2006-01-02 15:04:05"),
			PermissionIds: permissionIds,
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

	// Assign permissions
	if len(req.PermissionIds) > 0 {
		for _, permIdStr := range req.PermissionIds {
			permId, err := uuid.Parse(permIdStr)
			if err != nil {
				return &approval.ApprovalStatusResponse{
					Success: false,
					Message: "Invalid permission ID: " + permIdStr,
				}, nil
			}
			statusPermission := &models.ApprovalStatusPermission{
				ID:               uuid.New(),
				ApprovalStatusID: newStatus.ID,
				PermissionID:     permId,
			}
			_, err = database.BunDB.NewInsert().Model(statusPermission).Exec(ctx)
			if err != nil {
				return &approval.ApprovalStatusResponse{
					Success: false,
					Message: "Failed to assign permission: " + err.Error(),
				}, nil
			}
		}
	}

	// Fetch created status with permissions
	var createdStatus models.ApprovalStatus
	err = database.BunDB.NewSelect().Model(&createdStatus).Where("id = ?", newStatus.ID).Relation("Permissions").Scan(ctx)
	if err != nil {
		return &approval.ApprovalStatusResponse{
			Success: false,
			Message: "Failed to fetch created status: " + err.Error(),
		}, nil
	}

	// Convert permission IDs to string slice
	var permissionIds []string
	for _, p := range createdStatus.Permissions {
		permissionIds = append(permissionIds, p.ID.String())
	}

	return &approval.ApprovalStatusResponse{
		Success: true,
		Message: "Created successfully",
		Status: &approval.ApprovalStatus{
			Id:            createdStatus.ID.String(),
			Name:          createdStatus.Name,
			ApprovalType:  int32(createdStatus.ApprovalType),
			Status:        createdStatus.Status,
			Remark:        createdStatus.Remark,
			CreatedAt:     createdStatus.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:     createdStatus.UpdatedAt.Format("2006-01-02 15:04:05"),
			PermissionIds: permissionIds,
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

	// Update permission assignments
	// First, delete existing permission assignments for this approval status
	_, err = database.BunDB.NewDelete().Model((*models.ApprovalStatusPermission)(nil)).Where("approval_status_id = ?", id).Exec(ctx)
	if err != nil {
		return &approval.ApprovalStatusResponse{
			Success: false,
			Message: "Failed to clear existing permissions: " + err.Error(),
		}, nil
	}

	// Insert new permission assignments
	if len(req.PermissionIds) > 0 {
		for _, permIdStr := range req.PermissionIds {
			permId, err := uuid.Parse(permIdStr)
			if err != nil {
				return &approval.ApprovalStatusResponse{
					Success: false,
					Message: "Invalid permission ID: " + permIdStr,
				}, nil
			}
			statusPermission := &models.ApprovalStatusPermission{
				ID:               uuid.New(),
				ApprovalStatusID: id,
				PermissionID:     permId,
			}
			_, err = database.BunDB.NewInsert().Model(statusPermission).Exec(ctx)
			if err != nil {
				return &approval.ApprovalStatusResponse{
					Success: false,
					Message: "Failed to assign permission: " + err.Error(),
				}, nil
			}
		}
	}

	// Fetch updated status with permissions to return
	var updatedStatus models.ApprovalStatus
	err = database.BunDB.NewSelect().Model(&updatedStatus).Where("id = ?", id).Relation("Permissions").Scan(ctx)
	if err != nil {
		return &approval.ApprovalStatusResponse{
			Success: false,
			Message: "Failed to fetch updated status: " + err.Error(),
		}, nil
	}

	// Convert permission IDs to string slice
	var permissionIds []string
	for _, p := range updatedStatus.Permissions {
		permissionIds = append(permissionIds, p.ID.String())
	}

	return &approval.ApprovalStatusResponse{
		Success: true,
		Message: "Updated successfully",
		Status: &approval.ApprovalStatus{
			Id:            updatedStatus.ID.String(),
			Name:          updatedStatus.Name,
			ApprovalType:  int32(updatedStatus.ApprovalType),
			Status:        updatedStatus.Status,
			Remark:        updatedStatus.Remark,
			CreatedAt:     updatedStatus.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:     updatedStatus.UpdatedAt.Format("2006-01-02 15:04:05"),
			PermissionIds: permissionIds,
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
