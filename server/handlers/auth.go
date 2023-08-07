package handlers

import (
	"net/http"

	"coworkingapp/models"

	"github.com/gin-gonic/gin"
)

type UserInfo struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignupReq struct {
	UserInfo
	Email string `json:"email" binding:"required"`
}

func Login(c *gin.Context) {
	var userInfo UserInfo
	if err := c.ShouldBind(&userInfo); err != nil {
		c.JSON(http.StatusBadRequest, models.CoworkingErr{Code: models.ValidationErr, Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, userInfo)
}

func Signup(c *gin.Context) {
	var signupReq SignupReq
	if err := c.ShouldBind(&signupReq); err != nil {
		c.JSON(http.StatusBadRequest, models.CoworkingErr{Code: models.ValidationErr, Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, signupReq)
}
