const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl} is not a valid route`)
    // res.status(404).json({msg: `route not found - ${req.originalUrl}`})
    next(error)
    
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404
        message = "Resource not found"
    }

    res.status(statusCode).json({message})
}
export {
    notFound,
    errorHandler
}