import express from 'express'
import userRoutes from './routes/user.routes.js'
import authSession from './routes/authSession-cookie.js'
import authSessionToken from './routes/authSession-token.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(userRoutes)
app.use(authSession)
app.use(authSessionToken)


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})