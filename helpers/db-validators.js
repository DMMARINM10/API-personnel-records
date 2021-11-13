
const User = require('../models/user');
const Job = require('../models/jobs');
const validator = require('validator');

const emailExists = async( email = '' ) => {

    const existsEmail = await User.findOne({email});
    if (existsEmail) {
        throw new Error(`The e-mail is already registered`);
    }
}

const existUserById = async( uid = '' ) => {
    if(!validator.isMongoId(uid)) {
        throw new Error(`The uid is not valid`);
    } else {
        const userExist = await User.findById(uid);
        if (!userExist) {
        throw new Error(`The uid (user) does not exist`);
        }
    }
    
}

const statusFalse = async( uid = '' ) => {
    if(!validator.isMongoId(uid)) {
        throw new Error(`The uid is not valid`);
    } else {  
    const user = await User.findById(uid);
    const userStatus = user.status;
    if (!userStatus) {
        throw new Error(`The user's status is already false`);
    }
    }
}

const statusFalseJob = async( uid = '' ) => {
    if(!validator.isMongoId(uid)) {
        throw new Error(`The uid is not valid`);
    } else {  
    const job = await Job.findOne({user:uid});
    const jobStatus = job.status;
    if (!jobStatus) {
        throw new Error(`The job's status is already false`);
    }
    }
}

const existUserInJob = async( uid = '' ) => {
    if(!validator.isMongoId(uid)) {
        throw new Error(`The uid is not valid`);
    } else { 
    const existInJob = await Job.findOne({user:uid});
    if (existInJob) {
        throw new Error(`The user have already job information`);
    }}
}

const existJob = async( uid = '' ) => {
    if(!validator.isMongoId(uid)) {
        throw new Error(`The uid is not valid`);
    } else { 
    const existInJob = await Job.findOne({user:uid});
    if (!existInJob) {
        throw new Error(`There is not job information for this user`);
    }}
}

const paymentDay = async( day ) => {
    
    if (day > 31 | day < 1) {
        throw new Error(`Payment date must be an existing day`);
    }
}

 module.exports = {
     emailExists,
     existUserById,
     statusFalse,
     existUserInJob,
     paymentDay,
     statusFalseJob,
     existJob
 }