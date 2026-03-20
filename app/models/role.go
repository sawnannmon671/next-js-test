package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// Role represents the role model
type Role struct {
	bun.BaseModel `bun:"table:tbl_roles,alias:tr"`

	ID        uuid.UUID `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	Name      string    `bun:"name,notnull,unique" json:"name"`
	Status    bool      `bun:"status,default:true" json:"status"`
	Remark    string    `bun:"remark,type:text" json:"remark"`
	CreatedAt time.Time `bun:"created_at,nullzero,notnull,default:current_timestamp" json:"created_at"`

	// Relations
	Permissions []Permission `bun:"m2m:rlt_role_permissions,join:Role=Permission" json:"permissions,omitempty"`
}

// RolePermission represents the join table between roles and permissions
type RolePermission struct {
	bun.BaseModel `bun:"table:rlt_role_permissions,alias:rrp"`

	ID           uuid.UUID `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	RoleID       uuid.UUID `bun:"role_id,type:uuid,notnull" json:"role_id"`
	Role         *Role     `bun:"rel:belongs-to,join:role_id=id"`
	
	PermissionID uuid.UUID `bun:"permission_id,type:uuid,notnull" json:"permission_id"`
	Permission   *Permission `bun:"rel:belongs-to,join:permission_id=id"`
}
