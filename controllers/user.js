import mongoose from 'mongoose';
import User from '../models/user';

const UserController = {};

UserController.getUsers = async (req, res) => {
    try {
        const user = await User.find();
        return res.json({
            isSuccess: true,
            user: user
        });   
    } catch (e) {
        return res.json({
            message: 'Not found',
            err: e.message
        });
    }
}

UserController.addUser = async (req, res) => {
    try {
        const {userName, password, fullname} = req.body;
        if (!password) {
            return res.status(400).json({
                message: 'Invalid Password'             
            })
        }
        const user = new User ({
            // _id: new mongoose.Types.ObjectId(),
            userName,
            password,
            fullname
        });
        await user.save();
        return res.json({
            isSuccess: true,
            user: user
        });
   } catch (e) {    
        return res.status(400).json({
            isSuccess: false,
            message: e.message,
            
        });
   }
};
UserController.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.json({message: 'False'});
        }
        const body = req.body;
        user.userName = body.userName;
        user.password = body.password;
        user.fullname = body.fullname;
        await user.save();
        return res.json({
                isSuccess: true,
                user: user
        });     
       
    } catch (e) {
        return res.status(400).json({
            isSuccess: false,
            message: e.message,
            
        });
    }
}

UserController.deleteUser = async (req, res) => {
        try {
            const idUser = req.params.id
            await User.findById(idUser).deleteOne();
            return res.json({
                isSuccess: true,
                message: 'Done'
            });
        } catch (e) {
            return res.status(400).json({
                isSuccess: false,
                message: e.message,
                
            });
        } 
}




export default UserController;
