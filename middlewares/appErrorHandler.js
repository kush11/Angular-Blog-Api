let globalErrorHandler = (err, req, res, next) => {
    console.log('Application Error handler called')
    console.warn(err);
    res.send('Some error occured')
}

let notFoundHandler = (req, res, next) => {
    console.log('not gound handler');
    res.status(404).send('Rout not found in the application')
}

module.exports = {
    globalErrorHandler,
    notFoundHandler
}