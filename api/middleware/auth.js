const jwt = require('jsonwebtoken');
const tokenSecret = '73d0a03fed542049834b7988a27adde6ac18b4f77d4cefcef5c71f3e127c4a579e93926eb434da5379a44e2fa1adcd59de006bc50375ae3775f92e8befd8446e';
module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
        const abccc = jwt.verify(token, tokenSecret,  (err, result) => { 
            if (err) {
                console.log("Auth error", err);
                return res.status(401).send('Failed on second middleware');
            }
            req.userData = result;
        });
    next();
};