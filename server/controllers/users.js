import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import PasswordModel from "../models/passwordModel.js";
import userModel from "../models/userModel.js";


const PEPPER = "Zq3t6w9z$C&F)J@N";
const KEY = "!A%D*G-KaPdSgVkY";

export const signin = async(request, response)=>{
    const {username, password} = request.body;
    try {
       console.log('SIGN IN WORKS');
       var tempPassword;
       var isPasswordCorrect = false;
       const existingUser = await User.findOne({ username }); //search for existing user in database
       if(!existingUser) return response.status(404).json({message:"User doesn't exist."});
        if(existingUser.isPasswordKeptAsHash){
            const salt = existingUser.salt;
            tempPassword = CryptoJS.SHA512(PEPPER+salt+password).toString();
            if(CryptoJS.SHA512(PEPPER+salt+password) == existingUser.password) isPasswordCorrect = true;
            console.log("sha512 user detected")
            
        }else{
            tempPassword = CryptoJS.HmacSHA512(password, KEY).toString();
            if(tempPassword == existingUser.password) isPasswordCorrect = true;
            console.log("hmac user detected")
        }
           
      

       if(!isPasswordCorrect) return response.status(400).json({message: "Invalid credentials"});

       const token = jwt.sign({ username: existingUser.username, id: existingUser._id}, 'test', {expiresIn: "1h"}) //test is a secret

       response.status(200).json({result: existingUser, token});

    } catch (error) {   

      console.log(error);
      response.status(500).json({message: 'Something went wrong...'})

    }
}
export const signup = async(request, response)=>{
    const {username, password, confirmPassword, isPasswordKeptAsHash} = request.body;
    try {
        const existingUser = await User.findOne({ username }); //search for existing user in database
        var salt = CryptoJS.lib.WordArray.random(128/8);
        var hashedPassword;
        if(existingUser) return response.status(400).json({message:"User already exist."});
        if(password !== confirmPassword) return response.status(400).json({message:"Passwords dont match"});
        
        
        if(isPasswordKeptAsHash){
            
            hashedPassword = CryptoJS.SHA512(PEPPER+salt+password);
        }
        else{
            
            hashedPassword = CryptoJS.HmacSHA512(password, KEY);
            salt = null;
        }

        const result = await User.create({username, password:hashedPassword, isPasswordKeptAsHash, salt: salt});
        const token = jwt.sign({ username: result.username, id: result._id}, 'test', {expiresIn: "1h"}) //test is a secret

        response.status(200).json({result, token}); //user itself is a result

        
    } catch (error) {    
        console.log(error);
        response.status(500).json({message: 'Something went wrong...'})
    }
}

export const changePassword = async(req, res)=>{
    const {password,newPassword, confirmNewPassword, userId} = req.body;
 
    var isPasswordCorrect;
    var newPasswordString;
    const newSalt = CryptoJS.lib.WordArray.random(128/8);
    try{
        if(newPassword !== confirmNewPassword){
            console.log('Passwords dont match');
            return res.status(400).json({message:"Passwords dont match"});
            
        }
        const existingUser = await User.findById( userId );
        console.log("-----")
        //console.log(existingUser)
        if(!existingUser){
            console.log("No such a user in db")
       
           return res.status(404).json({message:"Cannot find user."}); 
          }   
        
        if(existingUser.isPasswordKeptAsHash){
            
            if(existingUser.password == CryptoJS.SHA512(PEPPER + existingUser.salt + password)){
                
                    isPasswordCorrect = true;
                    newPasswordString = CryptoJS.SHA512(PEPPER + newSalt + newPassword).toString();
                   
                    
            }
        }else {
            if(existingUser.password == CryptoJS.HmacSHA512(password, KEY).toString()){
                console.log('HMAC user want to change password');
                newPasswordString = CryptoJS.HmacSHA512(newPassword, KEY).toString()
                isPasswordCorrect = true;
                
            }
            
        }
        if(!isPasswordCorrect) {
            console.log('Bad credentials');
          return res.status(400).json({message: "Invalid credentials"});  
        }
        console.log(isPasswordCorrect)
        const userPasswords = await PasswordModel.find({creator: userId})
       
        
        userPasswords.forEach(async (singlePassword)=>{
         
            const temp = CryptoJS.AES.decrypt(singlePassword.password,CryptoJS.MD5(existingUser.password).toString());
            const oldPasswordPlainText = temp.toString(CryptoJS.enc.Utf8);
            
            const newEncryptedPassword = CryptoJS.AES.encrypt(oldPasswordPlainText,CryptoJS.MD5(newPasswordString).toString())
            
            singlePassword.password = newEncryptedPassword.toString();

            const newPassword = await PasswordModel.findByIdAndUpdate(singlePassword.id, singlePassword, {new: true})
           
            
        })
        
        existingUser.password = newPasswordString;
        existingUser.salt = newSalt;
        const newUserPassword = await userModel.findByIdAndUpdate(userId, existingUser, {new: true})
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id}, 'test', {expiresIn: "1h"})
        res.status(200).json({result: existingUser, token})
       
    } catch (error) {
        console.log(error)
    }
}