const express = require("express")
const registerUser = require("../controller/registerUser")
const checkEmail = require("../controller/checkEmail")
const checkPassword = require("../controller/checkPassword")
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const userDetails = require("../controller/userDetails")
const logout = require("../controller/logout")
const updateUserDetails = require("../controller/updateUserDetails")
const searchUserSearchbox = require("../controller/searchUserSearchbox")
const router = express.Router()

// creating user api
router.post('/register', registerUser)

// check user email
router.post('/email', checkEmail)

//check password
router.post('/password', checkPassword)

// Login user details
router.get('/user-details', userDetails)

// Logout user
router.get('/logout', logout)

// Update User-Details
router.post('/update-user', updateUserDetails)

// search user inside the searchbox
router.post('/search-user', searchUserSearchbox)

module.exports = router