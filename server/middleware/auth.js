import jwt from 'jsonwebtoken';

//action user want to do => auth middleware (NEXT) => do action (if middleware allows)
const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if(token){
            decodedData = jwt.verify(token, 'test'); //same 'test' secret used when created jwt        
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        console.log(error.message);
    }

}

export default auth;