package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/kkg52/user-management/models"
	"github.com/kkg52/user-management/utils"

	"github.com/gofiber/fiber/v2"
)

// GetAllUsers retrieves all users from the database.
func GetAllUsers(c *fiber.Ctx) error {
	var users []models.User

	result := utils.DB.Find(&users)
	if result.Error != nil {
		return c.Status(http.StatusNotFound).SendString("Users not found")
	}
	return c.Status(http.StatusOK).JSON(users)
}

// GetUsers retrieves multiple users by their IDs from the database.
func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	idsString := c.Params("ids")
	idsSlice := strings.Split(idsString, ",")

	var idsInt []int
	for _, idStr := range idsSlice {
		id, err := strconv.Atoi(idStr)
		if err != nil {
			fmt.Println("Invalid Number:", idStr)
			return err
		}
		idsInt = append(idsInt, id)
	}

	utils.DB.Where("id IN (?)", idsInt).Find(&users)
	return c.Status(http.StatusOK).JSON(users)
}

// CreateUser adds a new user to the database.
func CreateUser(c *fiber.Ctx) error {
	var newUser models.User
	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid request")
	}
	utils.DB.Create(&newUser)
	return c.Status(http.StatusCreated).JSON(newUser)
}

// DeleteUsersByIds deletes users by their IDs from the database.
func DeleteUsersByIds(c *fiber.Ctx) error {
	idsString := c.Params("ids")
	idsSlice := strings.Split(idsString, ",")

	var idsInt []int
	for _, idStr := range idsSlice {
		id, err := strconv.Atoi(idStr)
		if err != nil {
			fmt.Println("Invalid Number:", idStr)
			return err
		}
		idsInt = append(idsInt, id)
	}
	result := utils.DB.Where("id IN ?", idsInt).Delete(&[]models.User{})
	if result.Error != nil {
		return result.Error
	}
	return c.SendString("Users deleted successfully")
}

// UpdateUser updates a user's information in the database.
func UpdateUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	var existingUser models.User

	result := utils.DB.First(&existingUser, userID)
	if result.Error != nil {
		return c.Status(http.StatusNotFound).SendString("User not found")
	}

	var updatedUser models.User
	if err := c.BodyParser(&updatedUser); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid request")
	}

	utils.DB.Model(&existingUser).Updates(updatedUser)
	return c.Status(http.StatusOK).JSON(existingUser)
}
