if (process.env.NODE_ENV == "development"|| process.env.NODE_ENV == "test"){
    require(`dotenv`).config()
}

const express = require(`express`)
const cors = require('cors')
const app = express()

const router = require(`./router/index`)
const errrorHandler = require(`./middlewares/errorHandlers`)

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//use cors here
app.use(cors())


app.use(`/`,router)
app.use(errrorHandler)


module.exports = app