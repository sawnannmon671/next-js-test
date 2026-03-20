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

	models := []interface{}{
		(*models.User)(nil),
		(*models.Role)(nil),
		(*models.Permission)(nil),
		(*models.UserRole)(nil),
		(*models.RolePermission)(nil),
	}

	for _, model := range models {
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
