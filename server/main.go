package main

import (
	"encoding/json"
	"os"

	"coworkingapp/handlers"
	"coworkingapp/models"
	"coworkingapp/utils"

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
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Room{})
	db.Where("number_of_seats > 0").Delete(&models.Room{})
	r := gin.Default()
	r.Use(func(ctx *gin.Context) {
		ctx.Set("DbKey", db)
		ctx.Set("ConfigKey", config)
		ctx.Next()
	})
	r.POST("/auth/login", handlers.Login)
	r.POST("/auth/signup", handlers.Signup)
	r.GET("/rooms", handlers.GetAllRooms)
	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}

func seedRooms(db *gorm.DB) {
	db.Create([]*models.Room{
		{ID: utils.GetUuid(), Name: "Green", Cost: 12.50, NumberOfSeats: 4, Category: "Open Space", MainPhoto: "/green_0001.jpg"},
		{ID: utils.GetUuid(), Name: "Red", Cost: 100.00, NumberOfSeats: 50, Category: "Conference Hall", MainPhoto: "/red_0001.jpg"},
		{ID: utils.GetUuid(), Name: "Yellow", Cost: 4.50, NumberOfSeats: 1, Category: "Shared Desk", MainPhoto: "/yellow_0001.jpg"},
	})
}
