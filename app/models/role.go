package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// Role represents the tbl_roles table structure
type Role struct {
	bun.BaseModel `bun:"table:tbl_roles,alias:tr"`

	ID        uuid.UUID  `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	Name      string     `bun:"name,notnull" json:"name"`
	Status    bool       `bun:"status,default:true" json:"status"`
	Remark    string     `bun:"remark,type:text" json:"remark"`
	
	CreatedBy *uuid.UUID `bun:"created_by,type:uuid" json:"created_by"`
	UpdatedBy *uuid.UUID `bun:"updated_by,type:uuid" json:"updated_by"`
	DeletedBy *uuid.UUID `bun:"deleted_by,type:uuid" json:"deleted_by"`
	
	CreatedAt time.Time  `bun:"created_at,nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt time.Time  `bun:"updated_at,nullzero,notnull,default:current_timestamp" json:"updated_at"`
	DeletedAt *time.Time `bun:"deleted_at,soft_delete,nullzero" json:"deleted_at"`

	// Relations
	Permissions []Permission `bun:"m2m:rlt_role_permissions,join:Role=Permission" json:"permissions,omitempty"`
}

// RolePermission represents the rlt_role_permissions pivot table
type RolePermission struct {
	bun.BaseModel `bun:"table:rlt_role_permissions,alias:rrp"`

	ID           uuid.UUID `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	RoleID       uuid.UUID `bun:"role_id,type:uuid,notnull" json:"role_id"`
	PermissionID uuid.UUID `bun:"permission_id,type:uuid,notnull" json:"permission_id"`
}
