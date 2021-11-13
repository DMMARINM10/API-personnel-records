const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Job = require('../models/jobs');

const usersGet = async (req, res = response ) => {
    
    const activeStatus = { status: true };
    const { limit = 5, skip = 0 } = req.query;
    const [ total, users ] = await Promise.all([
        User.countDocuments(activeStatus),
        User.find(activeStatus)
        .skip(Number(skip))
        .limit(Number(limit))
    ]);
 
    res.json({
        total,
        users
    });
}

const usersGetId = async (req, res = response ) => {
    
    const {uid} = req.params;
    const user = await User.findById(uid);
    
    res.json({
        user
    });
}

const usersPut = async (req = request, res = response) => {
    
    const { uid } = req.params;
    const { password, ... rest } = req.body; 

    if(password) {
      
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );

    }

    const user = await User.findByIdAndUpdate(uid, rest);

    res.json(user);
}

const usersPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role});

   
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    

    await user.save();

    res.json({
        user
    });
}

const usersDelete = async (req =request, res = response) => {

    const {uid} = req.params;
    const user = await User.findByIdAndUpdate(uid, {status: false});
    const job  = await Job.findOneAndUpdate({user: uid}, {status: false});
    if (job === null | !job) {
        res.json({
            user
        });
    } else {
        res.json({
            user,
            job
        });
    }
    
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersGetId
}