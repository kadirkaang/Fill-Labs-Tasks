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

func GetAllUser(c *fiber.Ctx) error {
	var users []models.User

	result := utils.DB.Find(&users)
	if result.Error != nil {
		return c.Status(http.StatusNotFound).SendString("Users not found")
	}
	fmt.Println("Get All Users")
	return c.Status(http.StatusOK).JSON(users)
}

func GetUser(c *fiber.Ctx) error {
	var user models.User
	userID := c.Params("id")
	result := utils.DB.First(&user, userID)
	if result.Error != nil {
		return c.Status(http.StatusNotFound).SendString("User not found")
	}
	fmt.Println("Get User")
	return c.Status(http.StatusOK).JSON(user)
}

func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	idsString := c.Params("ids")
	fmt.Println(idsString)
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

	fmt.Println("Integer dizi:", idsInt)

	// IN sorgusu kullanarak kullanıcıları bulma
	utils.DB.Where("id IN (?)", idsInt).Find(&users)
	return c.Status(http.StatusOK).JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	var newUser models.User
	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid request")
	}
	utils.DB.Create(&newUser)
	fmt.Println("Create User")
	return c.Status(http.StatusCreated).JSON(newUser)
}

func DeleteUserByIds(c *fiber.Ctx) error {
	idsString := c.Params("ids")
	fmt.Println(idsString)
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
