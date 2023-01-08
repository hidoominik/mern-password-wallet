import mongoose from "mongoose";
import PasswordModel from "../models/passwordModel.js";
import CryptoJS from 'crypto-js';
import userModel from "../models/userModel.js";
import sharedPasswordModel from "../models/sharedPasswordModel.js";
import { response } from "express";

export const getPasswords = async(request, response)=>{
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
  
    
    const encryptedPassword = CryptoJS.AES.encrypt(password.password,CryptoJS.MD5(password.userPassword).toString());
   
    const newPassword = new PasswordModel({...password,password: encryptedPassword, creator: request.userId, createdAt: new Date().toISOString()})
    
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
    const encyptedPassword = CryptoJS.AES.encrypt(password.password,CryptoJS.MD5(password.userPassword).toString());
    password.password = encyptedPassword.toString();
    
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
    
    try {
        const userId = req.headers.authorization.split(" ")[2];
        const passwordData = await PasswordModel.findById(_id);
        const creatorData = await userModel.findById(passwordData.creator)
        const userData = await userModel.findById(userId);
       
        if(userData.password !== creatorData.password) return res.status(404).send('Passwords not matching');
        if (userId == creatorData._id){
            
            const decryptedPassword = CryptoJS.AES.decrypt(passwordData.password,CryptoJS.MD5(creatorData.password).toString());
            
            
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

export const sharePassword = async(req, res) => {
    //in request.body 
    //1. creatorId, 2. passwordId, 3. holderId
    const requestData = req.body;
    const {id: passwordId} = req.params;
        // const creatorId = req.headers.authorization.split(" ")[2];
        if(!mongoose.Types.ObjectId.isValid(requestData.creatorId)) return res.status(404).send('No user (owner) with that id');
        if(!mongoose.Types.ObjectId.isValid(passwordId)) return res.status(404).send('No password with that id');
        if(!mongoose.Types.ObjectId.isValid(requestData.holderId)) return res.status(404).send('No user (holder) with that id');

        const password = await PasswordModel.findById(passwordId);
        
        if(requestData.creatorId === password.creator){
            const newSharedPassword = new sharedPasswordModel({creatorId: requestData.creatorId, passwordId: passwordId, holderId: requestData.holderId});
            try {
                    await newSharedPassword.save();
                    res.status(201).json(newSharedPassword);

                } catch (error) {
                    res.status(409).json({message: error.message})
                }  

        }
        else{
            res.status(409).json({message: "Only owner can share password"})
        }
}

export const stopSharingPassword = async(req, res) => {
    const {id: passwordId} = req.params;
    const holderId = req.body.holderId;
    const userId = req.body.userId;
    if(!mongoose.Types.ObjectId.isValid(passwordId)) return res.status(404).send('No password with that id');
    if(!mongoose.Types.ObjectId.isValid(holderId)) return res.status(404).send('No user with that id');

    const password = await sharedPasswordModel.findOne({passwordId:passwordId, holderId: holderId});
    if(password.creatorId === userId){
       await sharedPasswordModel.findOneAndRemove({passwordId:passwordId, holderId: holderId});
        res.json({message:'Password no longer shared!'}); 
    }else{
        res.json({message:'Only owner can stop sharing password'}); 
    }
    
}

export const getAllSharedPasswords = async(req,res)=>{
    const {id: _id} = req.params;
    try {
        const passwordsData = await sharedPasswordModel.find({holderId:_id});
      
        res.status(200).json(passwordsData);
    } catch (error) {
        res.status(404).json({message: error.message})
      
    }
}

export const decryptSharedPassword = async(req, res) =>{
    const {id: passwordId} = req.params;
    const userId = req.body.userId;

    if(!mongoose.Types.ObjectId.isValid(passwordId)) return res.status(404).send('No password with that id');
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('No user with that id');

    const sharedPassword = await sharedPasswordModel.findOne({passwordId: passwordId, holderId: userId});
    if(!mongoose.Types.ObjectId.isValid(sharedPassword.id)) return res.status(404).send('No shared password with that id');

    const passwordOwner = await userModel.findById(sharedPassword.creatorId);

    try {
        const passwordData = await PasswordModel.findById(sharedPassword.passwordId);
        console.log(passwordOwner._id)
        console.log(passwordData.creator)
        if(passwordOwner._id.toString() === passwordData.creator){
            const decryptedPassword = CryptoJS.AES.decrypt(passwordData.password,CryptoJS.MD5(passwordOwner.password).toString());
            
            
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