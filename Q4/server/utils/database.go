package utils

import (
	"github.com/kkg52/user-management/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	var err error
	DB, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	if err := DB.AutoMigrate(&models.User{}); err != nil {
		return err
	}

	return nil
}

func CloseDB() {
	sqlDB, _ := DB.DB()
	sqlDB.Close()
}
