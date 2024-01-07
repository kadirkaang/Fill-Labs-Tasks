package handlers

import (
	"net/http"

	"github.com/kkg52/user-management/models"
	"github.com/kkg52/user-management/utils"

	"github.com/gofiber/fiber/v2"
)

func GetAllUser(c *fiber.Ctx) error {
	var users []models.User

	result := utils.DB.Find(&users)
	if result.Error != nil {
		return c.Status(http.StatusNotFound).SendString("Users not found")
	}
	return c.Status(http.StatusOK).JSON(users)
}

func GetUser(c *fiber.Ctx) error {
	var user models.User
	userID := c.Params("id")
	result := utils.DB.First(&user, userID)
	if result.Error != nil {
		return c.Status(http.StatusNotFound).SendString("User not found")
	}
	return c.Status(http.StatusOK).JSON(user)
}

func CreateUser(c *fiber.Ctx) error {
	var newUser models.User
	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid request")
	}
	utils.DB.Create(&newUser)
	return c.Status(http.StatusCreated).JSON(newUser)
}
