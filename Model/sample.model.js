const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: Number,
  // email: { type: String, required: true, unique: true },
  email: { type: String},
  firstname: String,
  secondname: String,
  message: String,
  age: { type: Number, min: 18 ,max:100},
  // userName: { type: String, regrex: /^[a-zA-Z0-9_]+$/ },
  gender: { type: String, enum: ["male", "female", "other"] },
  hobbies: [String],
  address: { street: String, doorNo: Number, city: String },
  phone: Number,
});

// ensure index is declared
UserSchema.index({ email: 1 }, { unique: true });
// single field
UserSchema.index({ age: 1 });
// compound index 
UserSchema.index({ age: 1, gender:1 });
// multikey index
UserSchema.index({ hobbies:1});
//partial index
UserSchema.index({ gender:1},{partialFilterExpression:{gender:"male"}});
// sparse index
// UserSchema.index({ phone:1},{sparse:true});
// single field
UserSchema.index({ "address.city":1 });
// wildcard index
UserSchema.index({ "$**": 1});

UserSchema.index({ "address.$**":1 });
// compound wildcard index

// text index
UserSchema.index({ message:"text" });

// hash
UserSchema.index({id:"hashed"})


// TTL index
UserSchema.index({ phone:1},{expireAfterSeconds:3000});




const UserModel = mongoose.model("Sample", UserSchema);
module.exports = UserModel;