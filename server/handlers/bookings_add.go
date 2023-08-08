package handlers

import (
	"net/http"
	"time"

	"coworkingapp/models"
	"coworkingapp/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BookingDto struct {
	RoomId   string `json:"room_id" binding:"required"`
	DateFrom string `json:"date_from" binding:"required"`
	DateTo   string `json:"date_to" binding:"required"`
}

func mapBookingDtoToModel(dto BookingDto) (model *models.Booking, err error) {
	dateFrom, err := time.Parse("2006-01-02", dto.DateFrom)
	if err != nil {
		return nil, models.CoworkingErr{StatusCode: http.StatusBadRequest, Code: models.DateWrongFormatErr, Message: err.Error()}
	}
	dateTo, err := time.Parse("2006-01-02", dto.DateTo)
	if err != nil {
		return nil, models.CoworkingErr{StatusCode: http.StatusBadRequest, Code: models.DateWrongFormatErr, Message: err.Error()}
	}
	model = &models.Booking{}
	model.ID = utils.GetUuid()
	model.RoomId = dto.RoomId
	model.BookedOn = time.Now()
	model.BookingStartDate = dateFrom
	model.BookingEndTime = dateTo
	return
}

// TODO: restrict the route with a middleware
func AddBooking(c *gin.Context) {
	var bookingDto BookingDto
	if err := c.ShouldBind(&bookingDto); err != nil {
		c.JSON(http.StatusBadRequest, models.CoworkingErr{Code: models.ValidationErr, Message: err.Error()})
		return
	}
	model, err := mapBookingDtoToModel(bookingDto)
	if err != nil {
		coworkingErr := err.(models.CoworkingErr)
		c.JSON(coworkingErr.StatusCode, coworkingErr)
		return
	}
	db := c.MustGet("DbKey").(*gorm.DB)
	// TODO: get email from ctx
	id, err := models.CreateBooking(db, *model, "ipesenti@sorint.com")
	if err != nil {
		coworkingErr := err.(models.CoworkingErr)
		c.JSON(coworkingErr.StatusCode, coworkingErr)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": *id})
}
