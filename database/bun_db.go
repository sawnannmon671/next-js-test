package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

var BunDB *bun.DB

func InitBunDB() {
	// Already using os.Getenv through godotenv in InitDB()
	host := os.Getenv("DB_HOST")
	if host == "" { host = "localhost" }
	user := os.Getenv("DB_USER")
	if user == "" { user = "postgres" }
	password := os.Getenv("DB_PASSWORD")
	if password == "" { password = "password" }
	dbname := os.Getenv("DB_NAME")
	if dbname == "" { dbname = "go_grpc_db" }
	port := os.Getenv("DB_PORT")
	if port == "" { port = "5432" }

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		user, password, host, port, dbname)

	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	
	BunDB = bun.NewDB(sqldb, pgdialect.New())

	if err := BunDB.Ping(); err != nil {
		log.Fatalf("Failed to connect to database with Bun: %v", err)
	}

	fmt.Println("Bun (PostgreSQL) connection established")
}
