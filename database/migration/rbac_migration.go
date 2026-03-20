package migration

import (
	"context"
	"fmt"
	"log"

	"go-grpc-next-js-test/app/models"
	"github.com/uptrace/bun"
)

func MigrateRBAC(db *bun.DB) {
	ctx := context.Background()

	// Register models for relations
	db.RegisterModel((*models.UserRole)(nil), (*models.RolePermission)(nil))

	modelsToCreate := []interface{}{
		(*models.User)(nil),
		(*models.Role)(nil),
		(*models.Permission)(nil),
		(*models.UserRole)(nil),
		(*models.RolePermission)(nil),
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
