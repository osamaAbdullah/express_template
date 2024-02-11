import { errors } from "@vinejs/vine";

export const globalErrorHandlers = (err, req, res, next) => {
    try {
        
        const sequelizeValidationErrors: string[] = [
            'SequelizeUniqueConstraintError',
            'SequelizeValidationError'
        ];
        
        // sequelizeValidationErrors
        if (sequelizeValidationErrors.includes(err.name)) {
            
            const errors = {}
            err.errors.forEach(error => {
                errors[error.path] = error.message
            })
            
            return res.status(422).json({
                messages: 'Validation error',
                errors: errors
            })
        }
        
        // handle vineJs validation errors
        if (err instanceof errors.E_VALIDATION_ERROR) {
            return res.json({ msg: err.messages })
        }
        
        const status: number = err.statusCode || 500;
        const message = err.message || 'Something went wrong!'
        
        console.log(
            '\n############################################################################################################',
            '\n############################################################################################################\n',
            `[${ req.method }] ${ req.path } >> StatusCode:: ${ status }, ErrorName: ${ err.name }, Message:: ${ message }`,
            err,
            '\n############################################################################################################',
            '\n############################################################################################################\n',
            // process.env,
            // '\n############################################################################################################',
            // '\n############################################################################################################\n'
        )
        
        res.status(status).json({
            message,
            stack: err.stack.split('\n').map(e => e.trim())
        });
    }
    catch (err) {
        next(err);
    }
};

export const norFoundErrorHandler = (req, res) => {
    res.status(404).json({ message: 'Route not found!' });
};
