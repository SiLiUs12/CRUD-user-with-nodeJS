var bcrypt = require('bcryptjs');
const db = require('../models');
const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data) =>{
    return new Promise(async(reslove,reject)=>{
        try {
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
            reslove('Ok create new user succeed!')
        } catch (error) {
            reject(error)
        }
    })
}

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

let readData = ()=>{
    return new Promise(async(reslove,reject)=>{
        try {
            let users = db.User.findAll({
                raw:true
            });
            reslove(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInfoByID = (userID) =>{
    return new Promise(async(reslove,reject)=>{
        try {
            let user = await db.User.findOne({
                where: {id: userID},
                raw: true,
            })
            if(user){
                reslove(user)
            }
            else{
                reslove([])
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) =>{
   return new Promise(async(resolve, reject) => {
    try {
        let user =  await db.User.findOne({
            where: {id: data.id}
        })
        if(user)
        {
            user.firstName = data.firstName,
            user.lastName = data.lastName,
            user.address = data.address

            await user.save();

            let alluser = await db.User.findAll()
            resolve(alluser);
        }
        else
        {
            resolve();
        }
    } catch (error) {
        reject(error)
    }
   })
}

let deleteUserData = (userID)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userID}
            })
            if(user)
            {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    createNewUser: createNewUser,
    readData: readData,
    getUserInfoByID: getUserInfoByID,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData
}