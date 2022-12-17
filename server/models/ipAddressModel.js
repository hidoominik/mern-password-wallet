import mongoose from 'mongoose';

const ipAddressSchema = mongoose.Schema({
    
    ipAddress: {type: String, required: true},
    unsuccessfullLoginCount: {type: Number, required: true},
    successfullLoginCount: {type: Number, required: true},
    isBanned:{type: Boolean, default:false},
    lockedUntil: {type: Date},
});

const ipAddressModel = mongoose.model('IP addresses', ipAddressSchema) //make our schema to an object

export default ipAddressModel;