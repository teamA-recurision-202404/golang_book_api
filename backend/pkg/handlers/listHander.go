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
	fmt.Fprintf(w, "Hello World, from ListHandler!")

	var response *http.Response
	var err error

	if page == "" {
		response, err:= http.Get("https://postcode.teraren.com/postcodes.json")
	} else {
		response, err:= http.Get("https://postcode.teraren.com/postcodes.json?page=" + page)
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

	for _, zipcode := range zipcodes {
		fmt.Println("Jis:", zipcode.Jis)
		fmt.Println("OldZip:", zipcode.OldZip)
		fmt.Println("Zip:", zipcode.Zip)
		fmt.Println("Prefecture:", zipcode.Prefecture)
		fmt.Println("City:", zipcode.City)
		fmt.Println("Suburb:", zipcode.Suburb)
		fmt.Println()
	}
	w.Header().Set("Content-Type", "application/json")

}