package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sort"
)

// レスポンスをjsonに変換するための構造体
// 参考: https://randomuser.me/documentation#results
type ResponseList struct {
	Results []Postcode `json:"results"`
}

type Postcode struct {
	Jis        string `json:"jis"`
	OldZip     string `json:"old"`
	Zip        string `json:"new"`
	Prefecture string `json:"prefecture"`
	City       string `json:"city"`
	Suburb     string `json:"suburb"`
}

func ListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	query := r.URL.Query()
	page := query.Get("page")
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

	var postcodes []Postcode
	err = json.Unmarshal(body, &postcodes)
	if err != nil {
		return
	}

	// asc or desc が指定されていたらソートする
	sortPostcodes(postcodes, sortOrder)

	err = json.NewEncoder(w).Encode(ResponseList{Results: postcodes})
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}

func sortPostcodes(postcodes []Postcode, sortOrder string) {
	if sortOrder == "asc" {
		sort.Slice(postcodes, func(i, j int) bool {
			return postcodes[i].Zip < postcodes[j].Zip
		})
	} else if sortOrder == "desc" {
		sort.Slice(postcodes, func(i, j int) bool {
			return postcodes[i].Zip > postcodes[j].Zip
		})
	}
}