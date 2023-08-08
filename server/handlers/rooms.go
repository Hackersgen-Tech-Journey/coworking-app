package handlers

import (
	"net/http"
	"time"

	"coworkingapp/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllRooms(c *gin.Context) {
	var dateFrom time.Time
	var err error
	rawDateFrom := c.Query("date_from")
	if rawDateFrom != "" {
		dateFrom, err = time.Parse("2006-01-02", rawDateFrom)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.CoworkingErr{Code: models.DateWrongFormatErr, Message: err.Error()})
			return
		}
	}
	var dateTo time.Time
	rawDateTo := c.Query("date_to")
	if rawDateTo != "" {
		dateTo, err = time.Parse("2006-01-02", rawDateTo)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.CoworkingErr{Code: models.DateWrongFormatErr, Message: err.Error()})
			return
		}
	}
	db := c.MustGet("DbKey").(*gorm.DB)
	rooms, err := models.GetRooms(db, dateFrom, dateTo)
	if err != nil {
		coworkingErr := err.(models.CoworkingErr)
		c.JSON(coworkingErr.StatusCode, coworkingErr)
		return
	}
	c.JSON(http.StatusOK, rooms)
}
