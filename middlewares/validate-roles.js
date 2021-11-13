
const { response, request } = require("express");


const adminRole = (req = request, res = response, next) => {
   
    const {role, name} = req.user;
    if(role !== 'ADMIN') {
        return res.status(401).json({
            msg: `${name} is not an admin`
        });
    }
    next();
}

module.exports = {
    adminRole
}