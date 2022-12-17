import mongoose from 'mongoose';

const loginsSchema = mongoose.Schema({
    
    userId: {type: String, required: true},
    ipAddressId: {type: String, required: true},
    wasSuccessful: {type: Boolean, required: true},
    loginDate:{
        type: Date,
        default: new Date()
    }
    
});

const loginsModel = mongoose.model('logins', loginsSchema) //make our schema to an object

export default loginsModel;