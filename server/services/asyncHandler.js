const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        next(error)
        console.log(error);
        if (error.errors) {
            const validationErrors = Object.values(error.errors).map(e => e.message)
            return res.status(400).json({ errors: validationErrors });
        }
    }
}

export default asyncHandler
