package main

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
	"go-grpc/api/approval"
	"go-grpc/api/user"
	"go-grpc/app/service"
	"go-grpc/database"
	"go-grpc/database/seeder"
)

func main() {
	// Initialize Database (GORM & Bun)
	database.InitDB()
	database.InitBunDB()

	// Seed Initial Data
	seeder.SeedApprovalStatus()
	
	fmt.Println("Starting gRPC Server on :50051...")
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	user.RegisterUserServiceServer(grpcServer, &service.UserServer{})
	approval.RegisterApprovalStatusServiceServer(grpcServer, &service.ApprovalStatusServer{})

	fmt.Println("gRPC Server listening on port 50051")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
