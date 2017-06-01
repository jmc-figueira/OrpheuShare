package data

import (
  "crypto/rand"
  "golang.org/x/crypto/scrypt"
  "io"
)

const (
  SALT_BYTES = 32
  HASH_BYTES = 64
)

type User struct{
  email string
  username string
  hashedPass []byte
}

func NewUser(email string, username string, password string) (*User, error){
  salt := make([]byte, SALT_BYTES)
  _, err := io.ReadFull(rand.Reader, salt)
  if err != nil{
    return nil, err
  }

  hash, err := scrypt.Key([]byte(password), salt, 1<<14, 8, 1, HASH_BYTES)
  if err != nil{
    return nil, err
  }

  return &User{email: email, username: username, hashedPass: hash}, nil
}
