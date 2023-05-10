
import bodyParser from 'body-parser'
import express from 'express'

const ApplyMiddleware = (app: express.Express) => {

    app.use(express.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
}

export default ApplyMiddleware