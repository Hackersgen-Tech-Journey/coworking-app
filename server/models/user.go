package models

import (
	"errors"
	"net/http"

	"gorm.io/gorm"
)

type CoworkingUser struct {
	gorm.Model
	Email    string
	Username string
	Password string
}

func LoginUser(db *gorm.DB, username, password string) (res *CoworkingUser, err error) {
	if err = db.Model(&CoworkingUser{}).Where("username = ? and password = ?", username, password).First(&res).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, CoworkingErr{StatusCode: http.StatusNotFound, Code: InvalidCredentialsErr, Message: err.Error()}
		}
		return nil, CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return
}
