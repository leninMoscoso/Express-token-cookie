import { Router } from "express";
import { Users } from '../../DB/Users.js'
import jwt from 'jsonwebtoken'


const authSessionToken = Router()

authSessionToken.post("/auth-token/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(401);

  const user = Users.find((user) => user.email === email);
  if (!user) return res.sendStatus(403);
  if (user.password !== password) return res.sendStatus(404);

  const token = jwt.sign(user.guid, process.env.SECRET_KEY)
  
  res.send(token);

});

authSessionToken.get("/auth-token/profile", (req, res) => {
    const {authorization} = req.headers
    if (!authorization) return res.status(401)

    const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
    const user = Users.find(user => user.guid === decoded)

    delete user.password
    res.send(user)

})

export default authSessionToken
