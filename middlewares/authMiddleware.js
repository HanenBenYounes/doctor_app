const JWT = require('jsonwebtoken');


module.exports = async(req, res, next)=>{
    try{
        console.warn(req)
     const token =  req.rawHeaders[1].replace(/^Bearer\s/, '');
     console.log(token)
     JWT.verify(token, process.env.JWT_SECRET,(err, decode)=>{
        if(err){
            console.log('error from auth middleware'+err)
            return res.status(401).send({
                message:'Auth Failed',
                success:false

            })
        }else{
            req.body.userId = decode.id;
            next()
        }
     });
    }catch (error){
        console.log(error);
        res.status(401).send({
            message:"Auth Failed",
            success: false,
        });

    }
};