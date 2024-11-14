const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

async function userDetails(request, response){
    try {
        const token = request.cookies.token || ""
        const user = await getUserDetailsFromToken(token)
        return response.status(200).json({
            message: "User Details",
            data: user
        })
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = userDetails