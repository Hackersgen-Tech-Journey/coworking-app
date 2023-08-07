package models

import (
	"errors"
	"net/http"

	"coworkingapp/utils"

	"gorm.io/gorm"
)

type CoworkingUser struct {
	ID       string
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

func SignupUser(db *gorm.DB, user CoworkingUser) (id string, err error) {
	if err = db.Model(&CoworkingUser{}).First(&CoworkingUser{}, "email = ?", user.Email).Error; err == nil {
		return "", CoworkingErr{StatusCode: http.StatusBadRequest, Code: EmailAlreadyInUse, Message: "please change the email and retry"}
	}
	user.ID = utils.GetUuid()
	if err = db.Model(&CoworkingUser{}).Create(&user).Error; err != nil {
		return "", CoworkingErr{StatusCode: http.StatusInternalServerError, Code: DbErr, Message: err.Error()}
	}
	return user.ID, nil
}
