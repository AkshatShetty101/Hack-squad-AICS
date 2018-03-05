package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Setup up Routes => Handler Functions
	router := mux.NewRouter()
	router.HandleFunc("/", homeHandler).Methods("GET")

	// Starting Serve
	fmt.Println("\nStarting Server => http://localhost:3443")
	handler := cors.Default().Handler(router)
	if err := http.ListenAndServe(":3443", handler); err != nil {
		fmt.Printf("\nmux server: %v\n", err)
	}
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	// if pusher, ok := w.(http.Pusher); ok {
	flusher, ok := w.(http.Flusher)

	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	fmt.Fprintf(w, "Req recieved")
	// if _, ok := w.(http.Pusher); ok {
	// 	// Push is supported.
	// 	// if err := pusher.Push("/app.js", nil); err != nil {
	// 	// log.Printf("Failed to push: %v", err)
	// 	// }
	// 	fmt.Fprintf(w, "Okay")
	// 	fmt.Println("Push is okay")
	// }
	for {

		// Write to the ResponseWriter
		// Server Sent Events compatible
		fmt.Fprintf(w, "asdf")

		// Flush the data immediatly instead of buffering it for later.
		flusher.Flush()
	}
}
