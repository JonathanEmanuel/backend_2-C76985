export const auth = (req, res, next) => {
    if( req.session?.user === 'pepe' && req.session?.role === 'admin'){
        return next()
    }else{
        res.status(401).send('<h4> Sin autorización </h4>');
    }
}
