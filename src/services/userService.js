const db = require('../models/index')
const bcrypt = require('bcryptjs');
const { raw } = require('body-parser');
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) =>{
    return new Promise(async(reslove,reject)=>{
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            reslove(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}

let handleLogin = (email,password)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let itExist = await checkUserMail(email);
            if(itExist)
            {
                let user = await db.User.findOne({
                    attributes: ['email','roleID','password'],
                    where: {email : email},
                    raw: true
                });
                if(user)
                {
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check)
                    {
                        userData.errorCode = 0;
                        userData.errorMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } 
                    else
                    {
                        userData.errorCode = 3;
                        userData.errorMessage = 'Wrong password';
                    }
                }
                else
                {
                    userData.errorCode - 2;
                    userData.errorMessage = 'User is not found'
                }   
            }
            else
            {
                userData.errorCode = 1;
                userData.errorMessage = 'Your email is not exist. Plz try other email'
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserMail = (userEmail)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email : userEmail}
            })
            if(user){
                resolve(true)
            }
            else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = (userID)=>{
    return new Promise(async(resolve, reject) => {
        let user = '';
        try {
            if(userID === 'ALL')
            {
                user = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            if(userID && userID != 'ALL')
            {
                user = await db.User.findOne({
                    where: {id: userID},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }

            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser =(data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkUserMail(data.email);
            if(check === true)
            {
                resolve({
                    errorCode:1,
                    errMessage: 'Your email is already in used , plz try another email'
                })
            }else{
                let hashPasswordFromcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender == '1' ? true : false,
                    roleID: data.roleID,
                    phonenumber: data.phonenumber,
    
                })
                
                resolve({
                    errorCode: 0,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


let detleteUser = (userID)=>{
    return new Promise(async(resolve, reject) => {
        let user = await db.User.findOne({
            where: {id: userID}
        })
        if(!user){
            resolve({
                errorCode: 2,
                errorMessage: 'your user is not exist'
            })
        }
        
        await db.User.destroy({
            where: {id: userID}
        })

        resolve({
            errorCode: 0,
            errorMessage: 'The user is deleted'
        })
        
    })
}

let updateUserData = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let user =  await db.User.findOne({
                where: {id: data.id},
                raw: false
            })
            if(user)
            {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,

                await user.save();

                resolve({
                    errorCode: 0,
                    errorMessage: 'update the user succeed!'
                })
            }
            else
            {
                resolve({
                    errorCode: 1,
                    errorMessage: 'user not found'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleLogin:handleLogin,
    getAllUser: getAllUser,
    createNewUser:createNewUser,
    detleteUser: detleteUser,
    updateUserData: updateUserData
}
