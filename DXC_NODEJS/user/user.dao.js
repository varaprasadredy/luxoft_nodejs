import UserModel from './user.model.js'
//Extra Data access layer for User model
//It contains DAO(i.e Data Access Object) logics
export default class UserDataLayer {
    //Return the all users from User table
    static async getAllUsers() {
        return await UserModel.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
    }
    //Return particular user details by id
    static async getUserByID(id) {
        return await UserModel.findByPk(id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
    }
    //Return particular user details by email
    static async getUserByEmail(email) {
        return await UserModel.findOne({
            where: { email: email },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true //Means it will give raw results from sequelize. We don't have to use results.dataValues / parse the JSON in controler.
        }
        )
    }
}