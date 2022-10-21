import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin = async(request, response)=>{
    const {username, password} = request.body;
    try {
       console.log('SIGN IN WORKS')
       const existingUser = await User.findOne({ username }); //search for existing user in database
       if(!existingUser) return response.status(404).json({message:"User doesn't exist."});

       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

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
        if(existingUser) return response.status(400).json({message:"User already exist."});
        if(password !== confirmPassword) return response.status(400).json({message:"Passwords dont match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({username, password:hashedPassword, isPasswordKeptAsHash});
        const token = jwt.sign({ username: result.username, id: result._id}, 'test', {expiresIn: "1h"}) //test is a secret

        response.status(200).json({result, token}); //user itself is a result

        
    } catch (error) {    
        console.log(error);
        response.status(500).json({message: 'Something went wrong...'})
    }
}