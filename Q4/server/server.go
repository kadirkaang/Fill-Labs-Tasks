package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/kkg52/user-management/handlers"
	"github.com/kkg52/user-management/utils"
)

func main() {
	if err := utils.InitDB(); err != nil {
		panic(err)
	}
	defer utils.CloseDB()

	app := fiber.New()
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Get("/user", handlers.GetAllUser)
	app.Get("/user/:id", handlers.GetUser)
	app.Post("/new_user", handlers.CreateUser)
	app.Get("/users/:ids", handlers.GetUsers)
	app.Delete("/delete_users/:Ids", handlers.DeleteUserByIds)
	app.Put("/update_user/:id", handlers.UpdateUser)

	app.Listen(":8080")
}
