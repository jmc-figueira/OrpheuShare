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
  realName string
  hashedPass []byte
  accountTokens []string
}

type JsonUser struct{
  Email string
  Username string
  RealName string
  Password string
}

func NewUser(user JsonUser) (*User, error){
  salt := make([]byte, SALT_BYTES)
  _, err := io.ReadFull(rand.Reader, salt)
  if err != nil{
    return nil, err
  }

  hash, err := scrypt.Key([]byte(user.Password), salt, 1<<14, 8, 1, HASH_BYTES)
  if err != nil{
    return nil, err
  }

  return &User{email: user.Email, username: user.Username, realName: user.RealName, hashedPass: hash, accountTokens: nil}, nil
}
