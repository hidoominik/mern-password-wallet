import mongoose from "mongoose";
import PasswordModel from "../models/passwordModel.js";
import CryptoJS from 'crypto-js';
import userModel from "../models/userModel.js";

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
    console.log("Pass to encrypt:" + password.password);
    console.log("ENCRYPTED WITH:" + password.userPassword)
    console.log("ENCRYPTED WITH MD5:" + CryptoJS.MD5(password.userPassword).toString())
    const encryptedPassword = CryptoJS.AES.encrypt(password.password,CryptoJS.MD5(password.userPassword).toString());
    //const encryptedPassword = CryptoJS.AES.encrypt(password.password, password.userPassword.slice(0, 32))
    const newPassword = new PasswordModel({...password,password: encryptedPassword, creator: request.userId, createdAt: new Date().toISOString()})
    console.log("ENCRYPTED PASS:" + encryptedPassword)
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
    console.log(password)
    if(!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('No password with that id');
    const encyptedPassword = CryptoJS.AES.encrypt(password.password,CryptoJS.MD5(password.userPassword).toString());
    password.password = encyptedPassword.toString();
    console.log(password)
    const updatedPassword = await PasswordModel.findByIdAndUpdate(_id, password, {new: true});
    response.json(updatedPassword);

}

export const deletePassword = async(req, res) =>{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('No password with that id');
    await PasswordModel.findByIdAndRemove(_id);
    res.json({message:'Password deleted succesfully'});
    
}

export const decryptPassword = async(req,res)=>{
    const user = req.body;
    const {id: _id} = req.params;
    console.log("---------------HELLO FROM GET DECRYPTED PASSWORD!!!------------------")
    try {
        const userId = req.headers.authorization.split(" ")[2];
        const passwordData = await PasswordModel.findById(_id);
        const creatorData = await userModel.findById(passwordData.creator)
        
        if (userId == creatorData._id){
            console.log("DECRYPTED WITH:" + creatorData.password)
            console.log("DECRYPTED WITH MD5:" + CryptoJS.MD5(creatorData.password))
            console.log("PASS TO DECRYPT:" + passwordData.password)
            const decryptedPassword = CryptoJS.AES.decrypt(passwordData.password,CryptoJS.MD5(creatorData.password).toString());
            //const decryptedPassword = CryptoJS.AES.decrypt(passwordData.password, creatorData.password.slice(0, 32));
            console.log("Pass after decrypt:" + decryptedPassword.toString(CryptoJS.enc.Utf8));
            passwordData.password = decryptedPassword.toString(CryptoJS.enc.Utf8);
            res.status(200).json(passwordData);
        }
        else{
            res.status(500).json({message:"Something went wrong"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}