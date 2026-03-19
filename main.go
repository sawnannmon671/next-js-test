package main

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
	"go-grpc/api/user"
	"go-grpc/app/service"
	"go-grpc/database"
)

func main() {
	// Initialize Database
	database.InitDB()
	
	fmt.Println("Starting gRPC Server on :50051...")
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	user.RegisterUserServiceServer(grpcServer, &service.UserServer{})

	fmt.Println("gRPC Server listening on port 50051")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
