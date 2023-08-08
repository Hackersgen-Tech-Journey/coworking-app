package models

import (
	"net/http"
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	ID               string    `json:"id"`
	BookedOn         time.Time `json:"booked_on"`
	BookingStartDate time.Time `json:"booking_start_date"`
	BookingEndDate   time.Time `json:"booking_end_date"`
	RoomId           string    `json:"room_id"`
	Room             Room      `json:"-"`
	UserId           string    `json:"-"`
	User             User      `json:"-"`
}

func CreateBooking(db *gorm.DB, booking Booking) (id *string, err error) {
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
