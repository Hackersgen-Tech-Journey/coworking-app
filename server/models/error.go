package models

const (
	ValidationErr         = "body validation"
	InvalidCredentialsErr = "user not registered or bad credentials"
	DbErr                 = "generic db err"
	TokenGenerationErr    = "failure in generating the JWT token"
	EmailAlreadyInUseErr  = "this email has been already registered"
	DateWrongFormatErr    = "date has a wrong format. Expected YYYY-mm-DD"
	ObjectNotFound        = "the object with the requested id is not found"
)

type CoworkingErr struct {
	StatusCode int    `json:"-"`
	Code       string `json:"code"`
	Message    string `json:"message"`
}

func (c CoworkingErr) Error() string {
	return c.Message
}
