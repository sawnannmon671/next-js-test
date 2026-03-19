package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	
	// Get environment variables or use defaults
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

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		host, user, password, dbname, port)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	fmt.Println("PostgreSQL connection established")
}
