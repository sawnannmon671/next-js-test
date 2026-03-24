package migration

import (
	"context"
	"fmt"
	"log"

	"github.com/uptrace/bun"
	"go-grpc-next-js-test/app/models"
)

func MigrateRBAC(db *bun.DB) {
	ctx := context.Background()

	// Register models for relations
	db.RegisterModel((*models.UserRole)(nil), (*models.RolePermission)(nil), (*models.ApprovalStatusPermission)(nil))

	modelsToCreate := []interface{}{
		(*models.User)(nil),
		(*models.Role)(nil),
		(*models.Permission)(nil),
		(*models.UserRole)(nil),
		(*models.RolePermission)(nil),
		(*models.ApprovalStatusPermission)(nil),
	}

	for _, model := range modelsToCreate {
		_, err := db.NewCreateTable().
			Model(model).
			IfNotExists().
			Exec(ctx)
		if err != nil {
			log.Fatalf("Failed to create table for model %T: %v", model, err)
		}
	}

	fmt.Println("RBAC tables checked/created")
}
