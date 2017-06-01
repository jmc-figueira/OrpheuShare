package service

import (
  "net/http"
  "github.com/gorilla/mux"
  "golang.org/x/net/context"
  "fmt"
  "google.golang.org/appengine"
  "google.golang.org/appengine/datastore"
  "encoding/json"
  "data"
)

func init(){
  router := mux.NewRouter()

  router.HandleFunc("/rest/v1/now", getNowListening).Methods("GET")
  router.HandleFunc("/rest/v1/listen", newListen).Methods("POST")

  http.Handle("/", router)
}

func getNowListening(w http.ResponseWriter, r *http.Request){
  ctx := appengine.NewContext(r)

  query := datastore.NewQuery("Listen")

  var listeners []data.Listen

  if _, get_err := query.GetAll(ctx, &listeners); get_err != nil{
    http.Error(w, get_err.Error(), 500)
  }

  jsonListeners, err := json.Marshal(listeners)
  if err != nil{
    http.Error(w, err.Error(), 500)
  }

  fmt.Fprint(w, string(jsonListeners))
}

func newListen(w http.ResponseWriter, r *http.Request){
  ctx := appengine.NewContext(r)

  err := datastore.RunInTransaction(ctx, func(ctx context.Context) error {
    testListen := new(data.Listen)
    testListen.Username = "Test"
    testListen.TrackName = "Hardstyle Classics"
    testListen.TrackID = "0"

    key := datastore.NewIncompleteKey(ctx, "Listen", nil)

    _, err := datastore.Put(ctx, key, testListen)

    return err
  }, nil)

  if err != nil{
    http.Error(w, err.Error(), 500)
  }

}