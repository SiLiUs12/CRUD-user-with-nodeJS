const  express = require('express');
const userController = require('../controller/userController')
const  homeController = require('../controller/homeController.js')

let router = express.Router();

let initWebRoutes = (app) =>{
    router.get('/',homeController.getHomePage);

    router.get('/crud',homeController.getCRUD)

    router.post('/post-crud',homeController.postCRUD);

    router.get('/get-crud',homeController.displayData);

    router.get('/edit-crud',homeController.getEditCRUD);

    router.post('/put-crud',homeController.putCRUD);

    router.get('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin)

    router.get('/api/get-all-user', userController.handleGetAllUser);

    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.post('/api/edit-user', userController.handleEditUser);
    router.post('/api/delete-user', userController.handleDeleteUser)

    return app.use("/", router);
}

module.exports = initWebRoutes;
