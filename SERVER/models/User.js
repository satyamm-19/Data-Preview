import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  phone: String,
  image: String,
});

const User = model('User', userSchema);

export default User;
