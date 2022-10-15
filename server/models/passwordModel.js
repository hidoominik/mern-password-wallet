import mongoose from 'mongoose';

const passwordSchema = mongoose.Schema({
    login: String,
    password: String,
    webAddress: String,
    description: String,
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const PasswordModel = mongoose.model('passwordModel', passwordSchema) //make our schema to an object

export default PasswordModel;