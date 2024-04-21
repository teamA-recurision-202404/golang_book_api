package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sort"

	"github.com/teamA-recursion-202404/golang_postcode_api/pkg/structs"
)

func ListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	query := r.URL.Query()
	page := query.Get("page")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	sortOrder := query.Get("sort") // 変数名sortは不可っぽい ライブラリの名前とかぶるため

	response, err := http.Get("https://postcode.teraren.com/postcodes.json?page=" + page)

	if err != nil {
		fmt.Println("Error fetching data:", err)
		return
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return
	}

	var postcodes []structs.Postcode
	err = json.Unmarshal(body, &postcodes)
	if err != nil {
		return
	}

	// asc or desc が指定されていたらソートする
	sortPostcodes(postcodes, sortOrder)

	err = json.NewEncoder(w).Encode(structs.ResponseList{Results: postcodes})
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}

func sortPostcodes(postcodes []structs.Postcode, sortOrder string) {
	if sortOrder == "asc" {
		sort.Slice(postcodes, func(i, j int) bool {
			return postcodes[i].Postcode < postcodes[j].Postcode
		})
	} else if sortOrder == "desc" {
		sort.Slice(postcodes, func(i, j int) bool {
			return postcodes[i].Postcode > postcodes[j].Postcode
		})
	}
}
