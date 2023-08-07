package models

const ValidationErr = "body validation"

type CoworkingErr struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func (c CoworkingErr) Error() string {
	return c.Message
}
