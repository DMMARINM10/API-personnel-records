
const { response, request } = require("express");
const User = require('../models/user');


const authoUserJob = async (req = request, res = response, next) => {
    
    const {user} = req.params;
    const {role, name, email} = req.user;
    const userByEmail = await User.findOne({email: email})
    const userId = userByEmail._id.valueOf();
    if(role === 'USER') {
        if(userId !== user) {
            return res.status(401).json({
                msg: `${name} is not authorized`
            });
        }
    }
    next();
}

const authoUser = async (req = request, res = response, next) => {
    
    const {uid} = req.params;
    const {role, name, email} = req.user;
    const userByEmail = await User.findOne({email: email})
    const userId = userByEmail._id.valueOf();
    if(role === 'USER') {
        if(userId !== uid) {
            return res.status(401).json({
                msg: `${name} is not authorized`
            });
        }
    }
    next();
}

module.exports = {
    authoUserJob,
    authoUser
}