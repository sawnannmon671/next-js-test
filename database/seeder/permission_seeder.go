package seeder

import (
	"context"
	"fmt"
	"log"

	"go-grpc-next-js-test/app/models"
	"go-grpc-next-js-test/database"
)

// RemoveViewPermissions deletes all permissions whose code ends with '.view'
// and all their associations in join tables.
func RemoveViewPermissions() {
	ctx := context.Background()

	// Find all permissions with code ending in '.view'
	var perms []models.Permission
	err := database.BunDB.NewSelect().
		Model(&perms).
		Where("code LIKE ?", "%.view").
		Scan(ctx)
	if err != nil {
		log.Printf("Failed to fetch view permissions: %v", err)
		return
	}
	if len(perms) == 0 {
		fmt.Println("No view permissions found, skipping deletion")
		return
	}

	for _, perm := range perms {
		// Delete from role_permissions join table
		_, err = database.BunDB.NewDelete().
			Model((*models.RolePermission)(nil)).
			Where("permission_id = ?", perm.ID).
			Exec(ctx)
		if err != nil {
			log.Printf("Failed to delete role permissions associations for permission %s: %v", perm.Code, err)
		} else {
			fmt.Printf("Deleted role_permissions associations for permission '%s'\n", perm.Code)
		}

		// Delete from approval_status_permissions join table
		_, err = database.BunDB.NewDelete().
			Model((*models.ApprovalStatusPermission)(nil)).
			Where("permission_id = ?", perm.ID).
			Exec(ctx)
		if err != nil {
			log.Printf("Failed to delete approval_status_permissions associations for permission %s: %v", perm.Code, err)
		} else {
			fmt.Printf("Deleted approval_status_permissions associations for permission '%s'\n", perm.Code)
		}

		// Delete the permission itself
		_, err = database.BunDB.NewDelete().
			Model(&perm).
			Where("id = ?", perm.ID).
			Exec(ctx)
		if err != nil {
			log.Printf("Failed to delete permission '%s': %v", perm.Code, err)
		} else {
			fmt.Printf("Deleted permission '%s'\n", perm.Code)
		}
	}
}
