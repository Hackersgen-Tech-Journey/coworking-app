package models

import (
	"net/http"
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	ID               string
	BookedOn         time.Time
	BookingStartDate time.Time
	BookingEndTime   time.Time
	RoomId           string
	Room             Room
}

func CreateBooking(db *gorm.DB, booking Booking) (id *string, err error) {
	err = db.Model(&Booking{}).Create(&booking).Error
	if err != nil {
		return nil, CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return &booking.ID, nil
}
