const httpStatus = require('http-status');
const logger = require('../config/logger');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

// create a phone number 
const createPhonebook = async (phonebookBody) => {
    return await db.phoneBook.create(phonebookBody);
};

const isPhoneNumberTaken = async (phonenumber) => {
    const phoneNumber = await db.phoneBook.findOne({
        where: { phoneNumber: phonenumber },
    });
    return !!phoneNumber
}

module.exports = {
    createPhonebook,
    isPhoneNumberTaken
}