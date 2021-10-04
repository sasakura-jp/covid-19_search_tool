package mws21undnm

import (
	"log"
	"net/http"
)

func Example() {
	const PORT = "8081"

	http.HandleFunc("/KeywordAPI", KeywordAPI)
	http.Handle("/", http.FileServer(http.Dir("static")))
	log.Fatal(http.ListenAndServe(":"+PORT, nil))
	println("OK")
	// Output:
	// OK
}
