import mongoose from 'mongoose';

const sharedPasswordSchema = mongoose.Schema({
    creatorId: {type: String, required: true},
    passwordId: {type: String, required: true},
    holderId: {type: String, required: true}
});

const sharedPasswordModel = mongoose.model('shared password', sharedPasswordSchema);
export default sharedPasswordModel;