import mongoose from 'mongoose';

const passwordSchema = mongoose.Schema({
    creator: String,
    login: String,
    password: String,
    webAddress: String,
    description: String,
    isEditable: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const PasswordModel = mongoose.model('password', passwordSchema) //make our schema to an object

export default PasswordModel;