package utils

import (
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateToken(email string, secretKey []byte) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()
	claims["sub"] = email
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
