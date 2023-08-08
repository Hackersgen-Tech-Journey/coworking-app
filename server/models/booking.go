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
	UserId           string
	User             User
}

func CreateBooking(db *gorm.DB, booking Booking, email string) (id *string, err error) {
	user, err := GetUserByEmail(db, email)
	if err != nil {
		return nil, err
	}
	booking.UserId = user.ID
	err = db.Model(&Booking{}).Create(&booking).Error
	if err != nil {
		return nil, CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return &booking.ID, nil
}

func GetBookingsByUserId(db *gorm.DB, userId string) (res []Booking, err error) {
	err = db.Model(&Booking{}).Where("user_id", userId).Find(&res).Error
	if err != nil {
		return nil, CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return
}
