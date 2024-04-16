package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type postcode struct {
	Jis        string `json:"jis"`
	OldZip     string `json:"old"`
	Zip        string `json:"new"`
	Prefecture string `json:"prefecture"`
	City       string `json:"city"`
	Suburb     string `json:"suburb"`
}

func ListHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	page := query.Get("page")
	fmt.Fprintf(w, "Hello World, from ListHandler!\n")

	var response *http.Response
	var err error

	if page == "" {
		response, err = http.Get("https://postcode.teraren.com/postcodes.json")
	} else {
		response, err = http.Get("https://postcode.teraren.com/postcodes.json?page=" + page)
	}

	if err != nil {
		fmt.Println("Error fetching data:", err)
		return
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return
	}

	var postcodes []postcode
	err = json.Unmarshal(body, &postcodes)
	if err != nil {
		return
	}

	err = json.NewEncoder(w).Encode(postcodes)
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "%s", postcodes)

}
