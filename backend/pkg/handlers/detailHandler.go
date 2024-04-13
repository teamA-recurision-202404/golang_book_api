package handlers

import (
	"fmt"
	"net/http"
)

func DetailHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World, from DetailHandler!")
}
