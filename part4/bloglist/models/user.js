const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String },
  passwordHash: { type: String },
  name: { type: String },
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = new mongoose.model('User', userSchema)

module.exports = User
