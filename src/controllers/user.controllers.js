import { Users } from '../../DB/Users.js'

export const getAllUsers = (req, res) => {
    res.send(Users)
}