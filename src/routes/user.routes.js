import { Router } from 'express'
import { getAllUsers } from '../controllers/user.controllers.js'

const routes = Router()

routes.get("/users", getAllUsers)


export default routes