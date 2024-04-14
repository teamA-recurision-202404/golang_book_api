package main

import (
	"fmt"
	"net/http"

	"example.com/zipcode_api_202304/pkg/handlers"
)

func main() {
	fmt.Println("Starting the server!")

	http.HandleFunc("/api/list", handlers.ListHandler)
	http.HandleFunc("/api/detail", handlers.DetailHandler)

	http.ListenAndServe(":8000", nil)
}
