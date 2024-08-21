import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please fill out the name'],
    },
    email: {
      type: String,
      required: [true, 'Please fill out the email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please fill out the password'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
