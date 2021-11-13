const { response, request } = require('express');
const Job = require('../models/jobs');

const jobGet = async (req, res = response ) => {
    
    const activeStatus = { status: true };
    const { limit = 5, skip = 0 } = req.query;
    const [ total, jobs ] = await Promise.all([
        Job.countDocuments(activeStatus),
        Job.find(activeStatus)
           .populate('user', ['name','email', 'role'])
           .skip(Number(skip))
           .limit(Number(limit))
    ]);
 
    res.json({
        total,
        jobs
    });
}

const jobGetId = async (req, res) => {
    const {user} = req.params;
    const job = await Job.findOne({user: user});
        res.json({
        job
    });
}

const jobPost = async (req = request, res = response) => {

    const { salary, totalSalary, startDate, endDate, paymentDate, contractType, user } = req.body;
    const job = new Job({ salary, totalSalary, startDate, endDate, paymentDate, contractType, user});

    await job.save();

    res.json({
        job
    });
}

const jobPut = async (req = request, res = response) => {
    
    const { user } = req.params;
    const { ... rest } = req.body; 
    const job = await Job.findOneAndUpdate({user}, rest);
    res.json(job);


}

const jobDelete = async (req =request, res = response) => {

    const {user} = req.params;
    const job  = await Job.findOneAndUpdate({user}, {status: false});
        res.json({
            job
        });
    
    
}


module.exports = {
    jobPost,
    jobPut,
    jobDelete, 
    jobGetId,
    jobGet
}