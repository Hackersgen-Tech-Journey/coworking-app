package main

import (
	"encoding/json"
	"os"

	"coworkingapp/handlers"
	"coworkingapp/middlewares"
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
	db.AutoMigrate(&models.Photo{})
	db.AutoMigrate(&models.Booking{})
	seedData(db)
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", config.AllowedOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		c.Next()
	})
	r.Use(func(ctx *gin.Context) {
		ctx.Set("DbKey", db)
		ctx.Set("ConfigKey", config)
		ctx.Next()
	})
	r.POST("/auth/login", handlers.Login)
	r.POST("/auth/signup", handlers.Signup)
	r.GET("/rooms", handlers.GetAllRooms)
	r.GET("/rooms/:id", handlers.GetRoomById)
	r.GET("/rooms/:id/photos", handlers.GetRoomPhotos)
	r.POST("/bookings", middlewares.AuthorizeUser(), handlers.AddBooking)
	r.GET("/bookings", middlewares.AuthorizeUser(), handlers.GetBookingsByUserId)
	r.GET("/bookings/:id", middlewares.AuthorizeUser(), handlers.GetBookingById)
	r.DELETE("/bookings/:id", middlewares.AuthorizeUser(), handlers.DeleteBooking)
	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}

func seedData(db *gorm.DB) {
	db.Where("room_id <> ''").Delete(&models.Booking{})
	db.Where("email <> ''").Delete(&models.User{})
	db.Where("url <> ''").Delete(&models.Photo{})
	db.Where("number_of_seats > 0").Delete(&models.Room{})
	userId := utils.GetUuid()
	db.Create(&models.User{
		ID:       userId,
		Email:    "ipesenti@sorint.com",
		Username: "ipesenti",
		Password: "abcd1234!!",
	})
	db.Create([]*models.Room{
		{
			ID: utils.GetUuid(), Name: "Green", Cost: 12.50, NumberOfSeats: 4, Category: "Open Space", MainPhoto: "/green_0001.jpg", Photos: []models.Photo{
				{Url: "/green_0002.jpg"},
				{Url: "/green_0003.jpg"},
			},
		},
		{ID: utils.GetUuid(), Name: "Red", Cost: 100.00, NumberOfSeats: 50, Category: "Conference Hall", MainPhoto: "/red_0001.jpg", Photos: []models.Photo{
			{Url: "/red_0002.jpg"},
		}},
		{ID: utils.GetUuid(), Name: "Yellow", Cost: 4.50, NumberOfSeats: 1, Category: "Shared Desk", MainPhoto: "/yellow_0001.jpg", Photos: []models.Photo{
			{Url: "/yellow_0002.jpg"},
			{Url: "/yellow_0003.jpg"},
			{Url: "/yellow_0004.jpg"},
		}},
	})
}
