package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// Permission represents the permission model
type Permission struct {
	bun.BaseModel `bun:"table:tbl_permissions,alias:tp"`

	ID        uuid.UUID `bun:"id,pk,type:uuid,default:gen_random_uuid()" json:"id"`
	Name      string    `bun:"name,notnull" json:"name"`
	Code      string    `bun:"code,notnull,unique" json:"code"`
	CreatedAt time.Time `bun:"created_at,nullzero,notnull,default:current_timestamp" json:"created_at"`
}
