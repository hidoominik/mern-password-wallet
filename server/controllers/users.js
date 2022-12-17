import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import PasswordModel from "../models/passwordModel.js";
import userModel from "../models/userModel.js";
import ipAddressModel from "../models/ipAddressModel.js";
import { checkIfIpIsBanned } from "./managers/ipAddress.js";
import loginsModel from "../models/loginsModel.js";

const PEPPER = "Zq3t6w9z$C&F)J@N";
const KEY = "!A%D*G-KaPdSgVkY";

export const signin = async(request, response)=>{

    const {username, password} = request.body;
    const reqIpAddress = (request.headers['x-forwarded-for'] || request.connection.remoteAddress || '').split(',')[0].trim();

    var ipData = {ipAddress: reqIpAddress, unsuccessfullLoginCount:'',successfullLoginCount:'', isBanned:'', lockedUntil:''}
    var IP = await ipAddressModel.findOne({ipAddress: reqIpAddress});

    if(!IP){
       ipData = {ipAddress: reqIpAddress, unsuccessfullLoginCount: 1,successfullLoginCount: 0, isBanned: false};
        const createIp = await ipAddressModel.create({ipAddress: reqIpAddress, unsuccessfullLoginCount: 1,successfullLoginCount: 0, isBanned: false, lockedUntil: Date.now()});
        IP = await ipAddressModel.findOne({ipAddress: reqIpAddress});
    }
    

    if(!IP?.isBanned){
        console.log(IP.lockedUntil)
        console.log(Date.now())
        if(IP.lockedUntil < Date.now()){
            
            try {
            console.log('SIGN IN WORKS');
            var tempPassword;
            var isPasswordCorrect = false;
            var existingUser = await User.findOne({ username }); //search for existing user in database
            console.log(existingUser)
            console.log(Date.now())
            if(existingUser.lockedUntil > Date.now()){
                return response.status(400).json({message:"Too many wrong attepts to login at this accout. Wait until " 
                   + existingUser.lockedUntil + " and try again."});
                }
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
                
            

            if(!isPasswordCorrect) {
                var existingIp = await ipAddressModel.findOne({ipAddress: reqIpAddress});
                let existingUserLogins = await userModel.findOne({username: username});
               
                existingUserLogins.numberOfUnsuccessfulLogins++;
                console.log(existingUserLogins.numberOfUnsuccessfulLogins)
                    if(existingUserLogins.numberOfUnsuccessfulLogins > 0){
                        existingUserLogins.lockedUntil = Date.now() + 100 * 60;                      
                       
                    }
                    if(existingUserLogins.numberOfUnsuccessfulLogins > 2){
                        existingUserLogins.lockedUntil = Date.now() + 2*1000*60;
                       
                    }
                    
                    existingUser.save();

                loginsModel.create({userId: existingUser._id, ipAddressId: IP.id, wasSuccessful: false})


                    existingIp.unsuccessfullLoginCount++;
                    console.log(existingIp);

                    if(existingIp.unsuccessfullLoginCount == 3){
                        existingIp.lockedUntil = Date.now() + 500 * 60;
                    }
                    if(existingIp.unsuccessfullLoginCount > 3 && existingIp.unsuccessfullLoginCount <= 4){
                        existingIp.lockedUntil = Date.now() + 2*1000*60;
                    }
                    if(existingIp.unsuccessfullLoginCount >= 5){
                        existingIp.isBanned = true;
                    }
                    existingIp.save();
                
                return response.status(400).json({message: "Invalid credentials"});
                    

            }

            const token = jwt.sign({ username: existingUser.username, id: existingUser._id}, 'test', {expiresIn: "1h"}) //test is a secret
            IP.unsuccessfullLoginCount = 0;
            IP.successfullLoginCount ++;
            IP.save();
            loginsModel.create({userId: existingUser._id, ipAddressId: IP.id, wasSuccessful: true})
            response.status(200).json({result: existingUser, token});

            } catch (error) {   

            console.log(error);
            response.status(500).json({message: 'Something went wrong...'})

            }
            }else{
                return response.status(400).json({message: 'Login restriction! Wait until ' + IP.lockedUntil + " and try again."})
            }
    }else{
        return response.status(400).json({message: 'This ip is banned!'})
    }
}
export const signup = async(request, response)=>{
    const {username, password, confirmPassword, isPasswordKeptAsHash} = request.body;
    console.log(request.body)
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

export const getLastLogins = async(request, response) =>{
    const {userId} = request.body;
    var successLogins = await loginsModel.find({userId: userId, wasSuccessful:true});
    var failedLogins = await loginsModel.find({userId: userId, wasSuccessful:false});
    if(!successLogins || !failedLogins) return response.status(404).json({message: "Brak historii logowania"});
    const lastLogins = {
        lastSuccesfullLogin: successLogins.slice(-2)[0],
        lastFailedLogin: failedLogins.slice(-1)[0] 
    } 
    
    return response.status(200).json({result: lastLogins});
}