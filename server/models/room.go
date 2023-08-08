package models

import (
	"errors"
	"net/http"
	"time"

	"gorm.io/gorm"
)

type Room struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Cost          float64 `json:"cost"`
	NumberOfSeats int     `json:"number_of_seats"`
	Category      string  `json:"category"`
	MainPhoto     string  `json:"main_photo"`
}

func GetRooms(db *gorm.DB, dateFrom, dateTo time.Time) (res []Room, err error) {
	// TODO: implement filters
	_ = dateFrom
	_ = dateTo
	err = db.Model(&Room{}).Find(&res).Error
	if err != nil {
		return nil, CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return
}

func GetRoomById(db *gorm.DB, id string) (res *Room, err error) {
	err = db.Model(&Room{}).First(&res, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, CoworkingErr{StatusCode: http.StatusNotFound, Code: ObjectNotFound, Message: err.Error()}
		}
		return nil, CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return
}
