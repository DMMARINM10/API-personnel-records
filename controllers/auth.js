const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
    const {email, password} = req.body;

    try {

        // Verify e-mail exist
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    msg: 'The e-mail does not exist in DB'
                });
            }

        //Verify user's status
        if(!user.status){
            return res.status(400).json({
                msg: `The user's status is false`
            });
        }

        //Verify password
            
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'The Username / password is incorrect (password)'
                })
            }
        // Generate JWT
        const token = await generateJWT( user.id ); 

        res.json({
            user,
            token
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Internal error',
            error
        })

    }

    
};

module.exports = {
    login
}