export const globalErrorHandlers = (err, req, res, next) => {

    console.log(
        '\n############################################################################################################',
        '\n############################################################################################################\n',
        err,
        '\n############################################################################################################',
        '\n############################################################################################################\n',
        // process.env,
        // '\n############################################################################################################',
        // '\n############################################################################################################\n'
    )

    if (err.name.startsWith('Sequelize')) {

        const errors = {}
        err.errors.forEach(error => {
            errors[error.path] = error.message
        })

        return res.status(422).json({
            messages: 'Validation error',
            errors: errors
        })
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).send({
        message: err.message || 'Something went wrong!',
        stack: err.stack.split('\n').map(e => e.trim())
    });
};

export const norFoundErrorHandler = (req, res) => {
    res.status(404).send({ message: 'Route not found!' });
};

export const asyncErrorHandler = (callback) => {
    return (req, res, next) => callback(req, res, next).catch(err => next(err))
};
