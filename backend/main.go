package main

import (
	"log"
	"net/http"

	"example.com/zipcode_api_202304/pkg/handlers"
)

func main() {
	log.Println("Starting the server!")

	http.HandleFunc("/api/detail", handlers.DetailHandler)

	http.ListenAndServe(":8000", nil)
}