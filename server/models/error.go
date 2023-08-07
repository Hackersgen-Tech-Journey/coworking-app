package models

const (
	ValidationErr         = "body validation"
	InvalidCredentialsErr = "user not registered or bad credentials"
	DbErr                 = "generic db err"
	TokenGenerationErr    = "failure in generating the JWT token"
	EmailAlreadyInUse     = "this email has been already registered"
)

type CoworkingErr struct {
	StatusCode int    `json:"-"`
	Code       string `json:"code"`
	Message    string `json:"message"`
}

func (c CoworkingErr) Error() string {
	return c.Message
}
