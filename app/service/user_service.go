package service

import (
	"context"
	"fmt"
	"go-grpc/api/user"
)

type UserServer struct {
	user.UnimplementedUserServiceServer
}

func (s *UserServer) GetUser(ctx context.Context, req *user.GetUserRequest) (*user.GetUserResponse, error) {
	fmt.Printf("Get User: %s\n", req.Id)
	return &user.GetUserResponse{
		Id:    req.Id,
		Name:  "Test User",
		Email: "test@example.com",
	}, nil
}

func (s *UserServer) CreateUser(ctx context.Context, req *user.CreateUserRequest) (*user.CreateUserResponse, error) {
	fmt.Printf("Create User: %s, %s\n", req.Name, req.Email)
	return &user.CreateUserResponse{
		Id:      "123",
		Success: true,
	}, nil
}
