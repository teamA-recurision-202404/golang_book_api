package main

import (

	"net/http"
	"encoding/json"
    "fmt"

	"example.com/zipcode_api_202304/pkg/handlers"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    // クエリパラメータを解析する
    query := r.URL.Query()
    name := query.Get("name") // "名前"から"name"へ修正

    // レスポンス用のマップを作成
    response := map[string]string{
        "message": "Hello " + name, // “message”： "Hello " + name、から修正
    }

    // Content-Typeヘッダーをapplication/jsonに設定
    w.Header().Set("Content-Type", "application/json")

    // マップをJSONにエンコードしてレスポンスとして送信
    json.NewEncoder(w).Encode(response)
}

func main() {
    fmt.Println("Starting the server!")

	http.HandleFunc("/api/list", handlers.ListHandler)
	http.HandleFunc("/api/detail", handlers.DetailHandler)

	http.ListenAndServe(":8000", nil)
}
