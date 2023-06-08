import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  userName: { type: String, unique: true },
  age: { type: Number },
  contactNo: { type: String },
  password: { type: String },

  followers: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String }
  }],
  following: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String }
  }],
  subgreddiits: [{
    status: { type: String, enum: ['moderator'] },
    subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
  }],
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.genToken = function () {
  return jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
