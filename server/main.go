package main

import (
	"encoding/json"
	"os"

	"coworkingapp/handlers"
	"coworkingapp/models"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var config models.CoworkingConfig

func init() {
	data, err := os.ReadFile("config/config.json")
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(data, &config); err != nil {
		panic(err)
	}
}

func main() {
	gin.SetMode(gin.DebugMode)
	db, err := gorm.Open(postgres.Open(config.Dsn))
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&models.CoworkingUser{})
	r := gin.Default()
	r.Use(func(ctx *gin.Context) {
		ctx.Set("DbKey", db)
		ctx.Set("ConfigKey", config)
		ctx.Next()
	})
	r.POST("/auth/login", handlers.Login)
	r.POST("/auth/signup", handlers.Signup)
	if err := r.Run(":8000"); err != nil {
		panic(err)
	}
}
