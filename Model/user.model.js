const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: Number,
  email: { type: String, required: true, unique: true },
  firstname: String,
  secondname: String,
  message: String,
 // password: {type: String, required: true},
  age: { type: Number, min: 18 ,max:100},
  // userName: { type: String, regrex: /^[a-zA-Z0-9_]+$/ },
  gender: { type: String, enum: ["male", "female", "other"] },
  hobbies: [String],
  address: { street: String, doorNo: Number, city: String },
  phone: Number,
});

// ensure index is declared
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  }
  next();
});

// Compare the input password with the stored hash
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;