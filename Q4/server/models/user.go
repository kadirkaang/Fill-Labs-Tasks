package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID      uint `gorm:"primaryKey"`
	Name    string
	Surname string
	Email   string
}
