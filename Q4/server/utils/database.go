package utils

import (
	"github.com/kkg52/user-management/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB initializes the database connection and performs migrations.
func InitDB() error {
	var err error
	DB, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	// AutoMigrate ensures that the User model is migrated to the database.
	if err := DB.AutoMigrate(&models.User{}); err != nil {
		return err
	}
	return nil
}

// CloseDB closes the database connection.
func CloseDB() {
	sqlDB, _ := DB.DB()
	sqlDB.Close()
}
