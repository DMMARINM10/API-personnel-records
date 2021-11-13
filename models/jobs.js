const { Schema, model } = require('mongoose');

const JobSchema = Schema({
    salary: {
        type: Number,
        required: [true, 'Salary is required']
    },
    totalSalary: {
        type: Number,
        required: [true, 'Total salary is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    paymentDate: {
        type: Number,
        required: [true, 'Payment date is required']
    },
    contractType: {
        type: String,
        required: [true, 'Contract type is required'],
        enum: ['FIXED', 'UNFIXED', 'SERVICES']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }

});

JobSchema.methods.toJSON = function() {
    const {__v, _id, ... job } = this.toObject();
    job.uid = _id;
    return job;
}

module.exports = model('Job', JobSchema);