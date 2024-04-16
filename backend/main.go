package main

import (
	"fmt"
	"net/http"

	"github.com/teamA-recursion-202404/golang_postcode_api/pkg/handlers"
)

func main() {
	fmt.Println("Starting the server!")

	http.HandleFunc("/api/list", handlers.ListHandler)
	http.HandleFunc("/api/detail", handlers.DetailHandler)

	http.ListenAndServe(":8000", nil)
}
