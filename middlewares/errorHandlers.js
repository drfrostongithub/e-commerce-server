module.exports = function errorHandlers(err, req, res, next) {
    console.log(`Error Middlewares!`, err)
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({ msg: err.errors[0].message })
    }
    else if (err.name === `SequelizeUniqueConstraintError`) {
        res.status(400).json({ msg: err.parent.detail })
    }
    else if (err.name === `SequelizeDatabaseError`) {
        res.status(400).json({ msg: err.parent.parameters[3] })
    }
    else if (err.name === `Wrong email/password`) {
        res.status(400).json({
            msg: err.name
        })
    }
    else if (err.name === `Error not found`) {
        res.status(404).json({
            msg: err.name
        })
    }
    else if (err.name === `Unauthorized`|| err.name === "JsonWebTokenError") {
        res.status(401).json({
            msg: `Unauthorized`
        })
    }
    else if (err.name === `Product cannot below 1`) {
        res.status(401).json({
            msg: err.name
        })
    }
    else if (err.name === `Stock isn't enough`) {
        res.status(401).json({
            msg: err.name
        })
    }
    else {
        res.status(500).json({
            msg : `Internal Server Error`,
            err : err
        })
    }
}

