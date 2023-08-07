package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	c.String(http.StatusOK, "login")
}

func Signup(c *gin.Context) {
	c.String(http.StatusOK, "signup")
}
