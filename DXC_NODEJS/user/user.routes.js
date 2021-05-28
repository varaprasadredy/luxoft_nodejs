//Import Controllers
import userController from './user.controller.js'
//Create a Controllers
const user = new userController()
//Export Router
export default function (router) {
    //CRUD Services
    router.post('/api/user', user.addUser)
    router.get('/api/user/:id', user.findUserById)
    router.get('/api/user', user.findAll)
    router.put('/api/user', user.updateUser)
    router.delete('/api/user/:id', user.deleteUser)

    //Custom Services
    router.post('/api/user/login', user.userLogin)
}