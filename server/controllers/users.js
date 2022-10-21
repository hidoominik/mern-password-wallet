import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';



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
        
        //const hashedPassword = await bcrypt.hash(password, 12);
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