const {auth} = require('firebase-admin');

const authService = auth();

exports.requiresAuth = async (req, res, next) => {
    try{
        const idToken = req.header('FIREBASE_AUTH_TOKEN');
        let decodedIdToken;
    
        try {
            decodedIdToken = await authService.verifyIdToken(idToken);
        } catch (error) {
            next(error);
            return;
        }
    
        req.user = decodedIdToken;
        next();
    
    } catch (error){
        console.log(error);
    }
}