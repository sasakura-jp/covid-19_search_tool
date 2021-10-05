package mws21undnm

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

const URL = "https://jlp.yahooapis.jp/KeyphraseService/V2/extract"

var APP_ID = os.Getenv("APP_ID")

func KeywordAPI(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	if req.Method == "OPTIONS" {
		w.Write([]byte{})
		return
	}

	if req.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		println("Error method")
		return
	}

	if req.Header.Get("Content-Type") != "application/json" {
		w.WriteHeader(http.StatusBadRequest)
		println("Invalid content type")
		return
	}

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		print(err.Error())
		return
	}

	r, err := http.NewRequest(
		"POST",
		URL,
		bytes.NewBuffer(body),
	)
	if err != nil {
		fmt.Fprint(w, err.Error())
		return
	}

	// Content-Type 設定
	r.Header.Set("Content-Type", "application/json")
	r.Header.Set("User-Agent", "Yahoo AppID: "+APP_ID)

	client := &http.Client{}
	res, err := client.Do(r)

	if err != nil {
		fmt.Fprint(w, err.Error())
		return
	}

	body, err = ioutil.ReadAll(res.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		print(err.Error())
		return
	}

	res.Body.Close()
	if res.StatusCode > 299 {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Response failed with status code: %d and\nbody: %s\n", res.StatusCode, body)
		println(string(body))
		println("Invalid status code")
		return
	}
	fmt.Fprint(w, string(body))
}
