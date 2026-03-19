package seeder

import (
	"context"
	"fmt"
	"log"

	"go-grpc/app/models"
	"go-grpc/database"
)

func SeedApprovalStatus() {
	ctx := context.Background()

	// Create table if it doesn't exist using Bun
	_, err := database.BunDB.NewCreateTable().
		Model((*models.ApprovalStatus)(nil)).
		IfNotExists().
		Exec(ctx)
	if err != nil {
		log.Fatalf("Failed to create table tbl_approval_status: %v", err)
	}

	fmt.Println("Table tbl_approval_status checked/created")

	// Check if data already exists
	count, _ := database.BunDB.NewSelect().
		Model((*models.ApprovalStatus)(nil)).
		Count(ctx)

	if count == 0 {
		// Seed some initial data
		statuses := []models.ApprovalStatus{
			{
				Name:         "Pending",
				ApprovalType: 1, // Workflow
				Status:       true,
				Remark:       "Initial pending state",
			},
			{
				Name:         "Approved",
				ApprovalType: 1, // Workflow
				Status:       true,
				Remark:       "Approval granted",
			},
			{
				Name:         "Rejected",
				ApprovalType: 2, // Application
				Status:       true,
				Remark:       "Application rejected",
			},
		}

		_, err := database.BunDB.NewInsert().
			Model(&statuses).
			Exec(ctx)
		if err != nil {
			log.Printf("Failed to seed data: %v", err)
		} else {
			fmt.Println("Initial data seeded into tbl_approval_status")
		}
	} else {
		fmt.Println("Table tbl_approval_status already has data")
	}
}
