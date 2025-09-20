const validator = require("validator");
const { validate } = require("../models/user");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("please Enter Name");
    } else if
        (!validator.isEmail(emailId)) {
        throw new Error("Enter valid EmailId");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please Enter Strong Password");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "age", "gender", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((feild) =>
        allowedEditFields.includes(feild)
    );

    return isEditAllowed;
};




module.exports = {validateSignUpData, validateEditProfileData,};
