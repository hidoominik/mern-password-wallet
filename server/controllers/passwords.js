import PasswordModel from "../models/passwordModel.js";


export const getPasswords = async(request, response)=>{
    
    try {
        const passwordsData = await PasswordModel.find();
      
        response.status(200).json(passwordsData);
    } catch (error) {
        response.status(404).json({message: error.message})
      
    }
}

export const createPassword = async(request, response) => {
    const password = request.body;
    //here encrypt logic //
    console.log("Password data from req body in backend:" ,password);
    //------------------------------------------------------------
    const newPassword = new PasswordModel(password);
    try {
        await newPassword.save();
        response.status(201).json(newPassword);
      
        
    } catch (error) {
        response.status(409).json({message: error.message})
      
    }
}