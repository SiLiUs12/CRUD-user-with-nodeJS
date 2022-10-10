const userService = require('../services/userService')

let handleLogin = async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password)
    {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }

    let userData = await userService.handleLogin(email,password);
    return res.status(200).json({
        errCode: userData.errorCode,
        message: userData.errorMessage,
        user: userData ? userData.user : {}
    })
}

let handleGetAllUser = async(req,res)=>{
    let id = req.query.id;
    let users = await userService.getAllUser(id);
    console.log(users)

    return res.status(200).json({
        errCode: 0,
        errorMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async(req,res)=>{
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async(req,res)=>{
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async(req,res)=>{
    if(!req.body.id)
    {
        return res.status(200).json({
            errCode: 1,
            errorMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.detleteUser(req.body.id);
    return res.status(200).json(message);
}




module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}