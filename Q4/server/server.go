package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/kkg52/user-management/handlers"
	"github.com/kkg52/user-management/utils"
)

func main() {
	// Initialize the database
	if err := utils.InitDB(); err != nil {
		panic(err)
	}
	defer utils.CloseDB()

	app := fiber.New()
	app.Use(cors.New())

	// Root route for testing purposes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// User routes for handling CRUD operations
	app.Get("/user", handlers.GetAllUser)
	app.Post("/new_user", handlers.CreateUser)
	app.Get("/users/:ids", handlers.GetUsers)
	app.Delete("/delete_users/:ids", handlers.DeleteUsersByIds)
	app.Put("/update_user/:id", handlers.UpdateUser)

	// Start the app on port 8080
	app.Listen(":8080")
}
