package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// ApprovalStatus represents the tbl_approval_status table structure
type ApprovalStatus struct {
	bun.BaseModel `bun:"table:tbl_approval_status,alias:tas"`

	ID           uuid.UUID  `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	Name         string     `bun:"name,notnull" json:"name"`
	ApprovalType int        `bun:"approval_type" json:"approval_type"`
	Status       bool       `bun:"status,default:true" json:"status"`
	Remark       string     `bun:"remark,type:text" json:"remark"`
	CreatedBy    *uuid.UUID `bun:"created_by,type:uuid" json:"created_by"`
	UpdatedBy    *uuid.UUID `bun:"updated_by,type:uuid" json:"updated_by"`
	DeletedBy    *uuid.UUID `bun:"deleted_by,type:uuid" json:"deleted_by"`
	CreatedAt    time.Time  `bun:"created_at,nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt    time.Time  `bun:"updated_at,nullzero,notnull,default:current_timestamp" json:"updated_at"`
	DeletedAt    *time.Time `bun:"deleted_at,soft_delete,nullzero" json:"deleted_at"`
}
