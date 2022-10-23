import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    isPasswordKeptAsHash: {type: Boolean, required: true},
    id: {type: String},
    salt: {type: String, required: false}
   
});

const userModel = mongoose.model('User', userSchema) //make our schema to an object

export default userModel;