import mongoose from "mongoose";
import PasswordModel from "../models/passwordModel.js";
import CryptoJS from 'crypto-js';

export const getPasswords = async(request, response)=>{
    console.log('------------------------------');
    const {id: _id} = request.params;
    
    try {
        const passwordsData = await PasswordModel.find({creator:_id});
      
        response.status(200).json(passwordsData);
    } catch (error) {
        response.status(404).json({message: error.message})
      
    }
}

export const createPassword = async(request, response) => {
    const password = request.body;
    //here encrypt logic //
    console.log(password);
    console.log(password.password)
    console.log(password.userPassword)
    console.log(CryptoJS.MD5(password.userPassword).toString())
    const encyptedPassword = CryptoJS.AES.encrypt(password.password,CryptoJS.MD5(password.userPassword).toString());
    const newPassword = new PasswordModel({...password,password: encyptedPassword, creator: request.userId, createdAt: new Date().toISOString()})
    try {
        await newPassword.save();
        response.status(201).json(newPassword);
      
        
    } catch (error) {
        response.status(409).json({message: error.message})
      
    }
}

export const updatePassword = async(request, response) => {
    const {id: _id} = request.params;
    const password = request.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('No password with that id');
    const updatedPassword = await PasswordModel.findByIdAndUpdate(_id, password, {new: true});
    response.json(updatedPassword);

}

export const deletePassword = async(req, res) =>{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('No password with that id');
    await PasswordModel.findByIdAndRemove(_id);
    res.json({message:'Password deleted succesfully'});
    
}