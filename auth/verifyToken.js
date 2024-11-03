const { verify } = require("jsonwebtoken");

module.exports = {

    verifyToken: (req, res, next) => {

        let token = req.get("authorization");

        if (token) {

            token = token.slice(7);

            verify(token, "clinton", (err, decode) => {

                if (err) {
                    return res.json({
                        message: "Invalid token"
                    });
                } else {
                    next()
                }
            });
        } else {
            return res.json({
                message: "Access denied, unauthorized user"
            });
        }

    }

}