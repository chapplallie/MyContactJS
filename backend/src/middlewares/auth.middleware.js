const jwt = require('jsonwebtoken');

function connectedUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized: pas de token dans la requete" });
    }
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).send({ message: "Pas de JWT configuré" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized" });
    }
}

module.exports = connectedUser;