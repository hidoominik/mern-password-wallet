import ipAddressModel from "../../models/ipAddressModel.js"

export const checkIfIpIsBanned = (ip) =>{
    const ipData =  ipAddressModel.findOne({ipAddress: ip});
    if(ipData){
        if(ipData?.isBanned == false){return false} else return true;
    }
    return false;
    
}

// export const registerNewIp = (ip, wasSuccessful) => {
//     const ipModel = {
//         ipAddress: ip,
//         unsuccesfullLoginCount: '',
//         isBanned: false,
//         locketUntil: '',
//     }
    
//     if(existingIp.exists){
//         if(!wasSuccessful)
//         ipModel = {...ipModel, unsuccesfullLoginCount: existingIp.unsuccesfullLoginCount+1}
        
//             if(ipModel.unsuccesfullLoginCount > 3 && ipModel.unsuccesfullLoginCount <= 5){
//                 ipModel={...ipModel, lockedUntil: Date.now() + 5}
//             }
//             if(ipModel.unsuccesfullLoginCount >)
//         }
//     }
//     if(wasSuccessful){
//         const ipAddress = new ipAddressModel({...ip, unsuccesfullLoginCount: 0})
//     }else{

//     }
    
// }