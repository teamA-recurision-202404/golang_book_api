package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
)

type zipcode struct {
	Jis string  `json:"jis"`
	OldZip string  `json:"old"`
	Zip string  `json:"new"`
	Prefecture string  `json:"prefecture"`
	City string  `json:"city"`
	Suburb string  `json:"suburb"`
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

	var zipcodes []zipcode
	err = json.Unmarshal(body, &zipcodes)
	if err != nil {
		return
	}

	w.Header().Set("Content-Type", "application/json")
	for _, val := range zipcodes {
        fmt.Fprintf(w, "Jis: %s, OldZip: %s, Zip: %s, Prefecture: %s, City: %s, Suburb: %s\n", val.Jis, val.OldZip, val.Zip, val.Prefecture, val.City, val.Suburb)
    }
}
