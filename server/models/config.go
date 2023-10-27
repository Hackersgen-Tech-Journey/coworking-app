package models

type CoworkingConfig struct {
	Dsn           string `json:"dsn"`
	SecretKey     string `json:"secret_key"`
	AllowedOrigin string `json:"allowed_origin"`
}
