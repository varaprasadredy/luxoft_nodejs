//Import Models
import UserModel from './user.model.js'
import httpStatus from 'http-status-codes'
import Utility from '../utility/utility.constant.js'
import UserDataLayer from './user.dao.js';
//Create a Class
export default class User {

    //Custom Endpoints
    async userLogin(request, response) {
        try {
            //First Find 
            let userDetails = await UserDataLayer.getUserByEmail(request.body.email)
            if (userDetails) {
                if (userDetails.password === request.body.password) {
                    //Check EMPLOYEE role user
                    if (userDetails.role == "EMPLOYEE") {
                        //Delete the password field from userDetails object
                        delete userDetails.password
                        //Return the response
                        return response.status(httpStatus.OK).send(userDetails)
                    }
                    //Check ADMIN role user
                    if (userDetails.role == "ADMIN") {
                        let users = await UserDataLayer.getAllUsers()
                        //Sort the user details by email
                        let sortedUsers = Utility.sortUsersByEmail(users)
                        //Return the response
                        return response.status(httpStatus.OK).send(sortedUsers)
                    }
                    //Return the response
                    return response.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorised User" })
                }
                return response.status(httpStatus.FORBIDDEN).send({ message: "Enter valid password" })
            }
            return response.status(httpStatus.FORBIDDEN).send({ message: "Provide valid username" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }

    //CRUD endpoints
    /**
     * @description : This Method is used for store the UserModel details
     */
    async addUser(request, response) {
        try {
            let userDetails = await UserModel.create(request.body)
            if (userDetails) {
                return response.status(httpStatus.OK).send({ message: "Created User" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "User not created" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }
    /**
     * @description: This method is used for Search by id
     */
    async findUserById(request, response) {
        try {
            let userDetails = await UserDataLayer.getUserByID(request.params.id)
            if (userDetails) {
                return response.status(httpStatus.OK).send(userDetails)
            }
            return response.status(httpStatus.NO_CONTENT).send({ message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }
    /**
     * @description: This method is used for find all User data
     */
    async findAll(request, response) {
        try {
            let users = await UserDataLayer.getAllUsers()
            //Sort the user details by email
            let sortedUsers = Utility.sortUsersByEmail(users)
            //Return the response
            return response.status(httpStatus.OK).send(sortedUsers)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }
    /**
     * @description : This Method is used for Update User data based on Id
     */
    async updateUser(request, response) {
        try {
            //First Find 
            let userDetails = await UserDataLayer.getUserByID(request.body.id)
            if (userDetails) {
                await UserModel.update(request.body, { where: { id: request.body.id } })
                //Return the response
                return response.status(httpStatus.OK).send({ message: "Updated Successfully!" })
            }
            return response.status(httpStatus.NO_CONTENT).send({ message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }
    /**
     * @description: This method is used for Delete User data based on Id
     */
    async deleteUser(request, response) {
        try {
            //First Find 
            let userDetails = await UserDataLayer.getUserByID(request.body.id)
            if (userDetails) {
                //Delete
                await UserModel.destroy({ where: { id: request.params.id } })
                return response.status(httpStatus.OK).send({ message: "Updated Deleted Successfully!" })
            }
            return response.status(httpStatus.NO_CONTENT).send({ message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }
}