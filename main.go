package main

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
	"go-grpc-next-js-test/api/approval"
	"go-grpc-next-js-test/api/user"
	"go-grpc-next-js-test/app/service"
	"go-grpc-next-js-test/database"
	"go-grpc-next-js-test/database/seeder"
	"go-grpc-next-js-test/database/migration"
)

func main() {
	database.InitDB()
	database.InitBunDB()

	// Run Migrations
	migration.MigrateRBAC(database.BunDB)

	// Seed Initial Data
	seeder.SeedApprovalStatus()
	
	fmt.Println("Starting gRPC Server on :50051...")
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	user.RegisterUserServiceServer(grpcServer, &service.UserServer{})
	user.RegisterRoleServiceServer(grpcServer, &service.UserServer{})
	user.RegisterPermissionServiceServer(grpcServer, &service.UserServer{})
	approval.RegisterApprovalStatusServiceServer(grpcServer, &service.ApprovalStatusServer{})

	fmt.Println("gRPC Server listening on port 50051")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
