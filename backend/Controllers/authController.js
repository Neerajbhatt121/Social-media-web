import { comparePassword, hashPassword } from '../helper/authHelper.js';
import userModal from '../modals/userModal.js';

export const registerController = async (req,res) => {
    try {
        const {name, email, password, answer}  = req.body;
        if(!name){
            res.send({message: "name is require"})
        } 
        if(!email){
            res.send({message: "email is require"})
        } 
        if(!password){
            res.send({message: "password is require"})
        } 
        if(!answer){
            res.send({message: "answer is require"})
        } 
        
    // check if use exist for not        
        const existingUser = await userModal.findOne({email: email});
        if(existingUser){
            return res.status(201).send({
                sucess: true,
                message: 'Already exiting email'
            });
        }
    
    // register the user now    
        const hashpassword = await hashPassword(password);
    // user
        const user = await userModal({
            name,
            email,
            password: hashpassword,
            answer,
        }).save();   
        console.log(user) 
        return res.status(200).send({
            sucess: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message:"beta kuch to galat hai"
        })
    }
};

//------------------------//
// Login
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            res.send({message: "email is require"})
        }
        if(!password){
            res.send({message: "password is require"})
        }  

    // find is email is present or not    
        const user = await userModal.findOne({email: email});
        if(!user){
            return res.status(404).send({
                sucess:false,
                message:"Invalid email"
            })
        }
        
    // matching the password    
        const match = await comparePassword(password, user.password);
        if(!match){
            res.status(200).send({
                sucess:false,
                messsage: "Invalid email or password"
            })
        }

    // jwt 
        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expriresIn: "7d"} )
        res.status(200).send({
            sucess:true,
            message:true,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                isGrpAdm: user.isGrpAdm,
            },
            token
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            sucess: false,
            message:"Something went wrong while logging"
        })
    }
}