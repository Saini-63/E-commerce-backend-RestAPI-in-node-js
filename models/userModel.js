import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email is already taken']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'password length should be greater than 6 character']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    city: {
        type: String,
        required: [true, 'city name is required']
    },
    country: {
        type: String,
        required: [true, 'country name is required']
    },
    phone: {
        type: String,
        required: [true, 'phone no is required']
    },
    profilePic: {
        type: String,
    },
}, { timestamps: true })

//Functions
//bcrypt hash func
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

//bcrypt compare function
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
}

export const userModel = mongoose.model('Users', userSchema);