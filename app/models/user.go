package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// User represents the tbl_users table structure
type User struct {
	bun.BaseModel `bun:"table:tbl_users,alias:tu"`

	ID           uuid.UUID  `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	Email        string     `bun:"email,notnull,unique" json:"email"`
	PasswordHash string     `bun:"password_hash,notnull" json:"-"`
	UserType     int        `bun:"user_type,default:0" json:"user_type"` // 0=ADMIN, 1=EXTERNAL
	EmployeeID   string     `bun:"employee_id" json:"employee_id"`
	CompanyName  string     `bun:"company_name" json:"company_name"`
	ContactNumber string    `bun:"contact_number" json:"contact_number"`
	Address      string     `bun:"address,type:text" json:"address"`
	Status       bool       `bun:"status,default:true" json:"status"`
	Remark       string     `bun:"remark,type:text" json:"remark"`
	
	CreatedBy    *uuid.UUID `bun:"created_by,type:uuid" json:"created_by"`
	UpdatedBy    *uuid.UUID `bun:"updated_by,type:uuid" json:"updated_by"`
	DeletedBy    *uuid.UUID `bun:"deleted_by,type:uuid" json:"deleted_by"`
	
	CreatedAt    time.Time  `bun:"created_at,nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt    time.Time  `bun:"updated_at,nullzero,notnull,default:current_timestamp" json:"updated_at"`
	DeletedAt    *time.Time `bun:"deleted_at,soft_delete,nullzero" json:"deleted_at"`

	// Relations
	Roles []Role `bun:"m2m:rlt_user_roles,join:User=Role" json:"roles,omitempty"`
}

// UserRole represents the rlt_user_roles pivot table
type UserRole struct {
	bun.BaseModel `bun:"table:rlt_user_roles,alias:rur"`

	ID     uuid.UUID `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	UserID uuid.UUID `bun:"user_id,type:uuid,notnull" json:"user_id"`
	RoleID uuid.UUID `bun:"role_id,type:uuid,notnull" json:"role_id"`
}
