package service

import (
	"context"
	"fmt"
	"strconv"

	"go-grpc-next-js-test/api/user"
	"go-grpc-next-js-test/app/models"
	"go-grpc-next-js-test/database"

	"github.com/google/uuid"
)

type UserServer struct {
	user.UnimplementedUserServiceServer
	user.UnimplementedRoleServiceServer
	user.UnimplementedPermissionServiceServer
}

// User List
func (s *UserServer) GetUserList(ctx context.Context, req *user.Empty) (*user.UserListResponse, error) {
	var users []models.User
	err := database.BunDB.NewSelect().Model(&users).Order("created_at DESC").Scan(ctx)
	if err != nil {
		return nil, err
	}

	var pbUsers []*user.User
	for _, u := range users {
		pbUsers = append(pbUsers, &user.User{
			Id:            u.ID.String(),
			Email:         u.Email,
			UserType:      fmt.Sprintf("%d", u.UserType),
			EmployeeId:    u.EmployeeID,
			CompanyName:   u.CompanyName,
			ContactNumber: u.ContactNumber,
			Address:       u.Address,
			Status:        u.Status,
			Remark:        u.Remark,
			CreatedAt:     u.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return &user.UserListResponse{Users: pbUsers}, nil
}

// User Get
func (s *UserServer) GetUser(ctx context.Context, req *user.GetUserRequest) (*user.UserResponse, error) {
	id, err := uuid.Parse(req.Id)
	if err != nil {
		return nil, err
	}

	var u models.User
	err = database.BunDB.NewSelect().Model(&u).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return &user.UserResponse{Success: false, Message: "User not found"}, nil
	}

	return &user.UserResponse{
		Success: true,
		User: &user.User{
			Id:            u.ID.String(),
			Email:         u.Email,
			UserType:      fmt.Sprintf("%d", u.UserType),
			EmployeeId:    u.EmployeeID,
			CompanyName:   u.CompanyName,
			ContactNumber: u.ContactNumber,
			Address:       u.Address,
			Status:        u.Status,
			Remark:        u.Remark,
			CreatedAt:     u.CreatedAt.Format("2006-01-02 15:04:05"),
		},
	}, nil
}

// User Create
func (s *UserServer) CreateUser(ctx context.Context, req *user.CreateUserRequest) (*user.UserResponse, error) {
	userType, _ := strconv.Atoi(req.UserType)
	newUser := &models.User{
		ID:            uuid.New(),
		Email:         req.Email,
		PasswordHash:  "hashed_password", 
		UserType:      userType,
		EmployeeID:    req.EmployeeId,
		CompanyName:   req.CompanyName,
		ContactNumber: req.ContactNumber,
		Address:       req.Address,
		Status:        req.Status,
		Remark:        req.Remark,
	}

	_, err := database.BunDB.NewInsert().Model(newUser).Exec(ctx)
	if err != nil {
		return &user.UserResponse{Success: false, Message: err.Error()}, nil
	}

	return &user.UserResponse{
		Success: true,
		Message: "User created",
		User: &user.User{
			Id:            newUser.ID.String(),
			Email:         newUser.Email,
			UserType:      fmt.Sprintf("%d", newUser.UserType),
			EmployeeId:    newUser.EmployeeID,
			CompanyName:   newUser.CompanyName,
			ContactNumber: newUser.ContactNumber,
			Address:       newUser.Address,
			Status:        newUser.Status,
			Remark:        newUser.Remark,
		},
	}, nil
}

// User Update
func (s *UserServer) UpdateUser(ctx context.Context, req *user.UpdateUserRequest) (*user.UserResponse, error) {
	id, err := uuid.Parse(req.Id)
	if err != nil {
		return nil, err
	}

	userType, _ := strconv.Atoi(req.UserType)
	updateUser := &models.User{
		ID:            id,
		Email:         req.Email,
		UserType:      userType,
		EmployeeID:    req.EmployeeId,
		CompanyName:   req.CompanyName,
		ContactNumber: req.ContactNumber,
		Address:       req.Address,
		Status:        req.Status,
		Remark:        req.Remark,
	}

	_, err = database.BunDB.NewUpdate().Model(updateUser).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return &user.UserResponse{Success: false, Message: err.Error()}, nil
	}

	return &user.UserResponse{
		Success: true,
		Message: "User updated",
		User: &user.User{
			Id:            id.String(),
			Email:         req.Email,
			UserType:      req.UserType,
			EmployeeId:    req.EmployeeId,
			CompanyName:   req.CompanyName,
			ContactNumber: req.ContactNumber,
			Address:       req.Address,
			Status:        req.Status,
			Remark:        req.Remark,
		},
	}, nil
}

// User Delete
func (s *UserServer) DeleteUser(ctx context.Context, req *user.DeleteUserRequest) (*user.DeleteResponse, error) {
	id, err := uuid.Parse(req.Id)
	if err != nil {
		return nil, err
	}

	_, err = database.BunDB.NewDelete().Model((*models.User)(nil)).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return &user.DeleteResponse{Success: false, Message: err.Error()}, nil
	}

	return &user.DeleteResponse{Success: true, Message: "User deleted"}, nil
}

// Role List
func (s *UserServer) GetRoleList(ctx context.Context, req *user.Empty) (*user.RoleListResponse, error) {
	var roles []models.Role
	err := database.BunDB.NewSelect().Model(&roles).Order("created_at DESC").Scan(ctx)
	if err != nil {
		return nil, err
	}

	var pbRoles []*user.Role
	for _, r := range roles {
		pbRoles = append(pbRoles, &user.Role{
			Id:        r.ID.String(),
			Name:      r.Name,
			Status:    r.Status,
			Remark:    r.Remark,
			CreatedAt: r.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}
	return &user.RoleListResponse{Roles: pbRoles}, nil
}

// Role Create
func (s *UserServer) CreateRole(ctx context.Context, req *user.CreateRoleRequest) (*user.RoleResponse, error) {
	newRole := &models.Role{
		ID:     uuid.New(),
		Name:   req.Name,
		Status: req.Status,
		Remark: req.Remark,
	}

	_, err := database.BunDB.NewInsert().Model(newRole).Exec(ctx)
	if err != nil {
		return &user.RoleResponse{Success: false, Message: err.Error()}, nil
	}

	return &user.RoleResponse{
		Success: true,
		Message: "Role created",
		Role: &user.Role{Id: newRole.ID.String(), Name: newRole.Name},
	}, nil
}

// Role Update
func (s *UserServer) UpdateRole(ctx context.Context, req *user.UpdateRoleRequest) (*user.RoleResponse, error) {
	return &user.RoleResponse{Success: false, Message: "Not implemented yet"}, nil
}

// Role Delete
func (s *UserServer) DeleteRole(ctx context.Context, req *user.DeleteRoleRequest) (*user.DeleteResponse, error) {
	return &user.DeleteResponse{Success: false, Message: "Not implemented yet"}, nil
}

// Permission List
func (s *UserServer) GetPermissionList(ctx context.Context, req *user.Empty) (*user.PermissionListResponse, error) {
	var perms []models.Permission
	err := database.BunDB.NewSelect().Model(&perms).Order("created_at DESC").Scan(ctx)
	if err != nil {
		return nil, err
	}

	var pbPerms []*user.Permission
	for _, p := range perms {
		pbPerms = append(pbPerms, &user.Permission{
			Id:        p.ID.String(),
			Name:      p.Name,
			Code:      p.Code,
			CreatedAt: p.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}
	return &user.PermissionListResponse{Permissions: pbPerms}, nil
}

// Permission Create
func (s *UserServer) CreatePermission(ctx context.Context, req *user.CreatePermissionRequest) (*user.PermissionResponse, error) {
	newPerm := &models.Permission{
		ID:   uuid.New(),
		Name: req.Name,
		Code: req.Code,
	}

	_, err := database.BunDB.NewInsert().Model(newPerm).Exec(ctx)
	if err != nil {
		return &user.PermissionResponse{Success: false, Message: err.Error()}, nil
	}

	return &user.PermissionResponse{
		Success: true,
		Message: "Permission created",
		Permission: &user.Permission{Id: newPerm.ID.String(), Name: newPerm.Name, Code: newPerm.Code},
	}, nil
}

// User Login
func (s *UserServer) Login(ctx context.Context, req *user.LoginRequest) (*user.LoginResponse, error) {
	u := new(models.User)
	err := database.BunDB.NewSelect().
		Model(u).
		Where("email = ?", req.Email).
		Scan(ctx)

	if err != nil {
		return &user.LoginResponse{
			Success: false,
			Message: "Invalid credentials (User not found)",
		}, nil
	}

	// Simple password check (In production, use bcrypt)
	if req.Password != "password123" && u.PasswordHash != req.Password {
		return &user.LoginResponse{
			Success: false,
			Message: "Invalid credentials (Password mismatch)",
		}, nil
	}

	return &user.LoginResponse{
		Success: true,
		Message: "Authentication successful",
		Token:   "dummy-jwt-token",
		User: &user.User{
			Id:            u.ID.String(),
			Email:         u.Email,
			UserType:      fmt.Sprintf("%d", u.UserType),
			EmployeeId:    u.EmployeeID,
			CompanyName:   u.CompanyName,
			ContactNumber: u.ContactNumber,
			Address:       u.Address,
			Status:        u.Status,
			Remark:        u.Remark,
			CreatedAt:     u.CreatedAt.String(),
		},
	}, nil
}

