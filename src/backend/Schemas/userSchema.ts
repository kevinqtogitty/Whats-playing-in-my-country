import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  movies: [],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
