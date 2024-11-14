const UserModel = require("../models/UserModel")

async function checkEmail(request, response) {
    try {
        const {email} = request.body
        const checkEmail = await UserModel.findOne({email}).select("-password")

        if (!checkEmail){
            return response.status(500).json({
                message: "User not Found",
                error: true
            })
        }
        return response.status(201).json({
            message: "Email verified successfully",
            success: true,
            data: checkEmail
        })

    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        })  
    }
}

module.exports = checkEmail