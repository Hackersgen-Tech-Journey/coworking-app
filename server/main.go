package main

import (
	"coworkingapp/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.DebugMode)
	r := gin.Default()

	r.POST("/auth/login", handlers.Login)
	r.POST("/auth/signup", handlers.Signup)

	if err := r.Run(":8000"); err != nil {
		panic(err)
	}
}
