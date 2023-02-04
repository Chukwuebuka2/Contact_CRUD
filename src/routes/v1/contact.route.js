const express = require('express');
const validate = require('../../middlewares/validate');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

// create a new contact
router.post('/create', auth(), validate(contactValidation.createContact), contactController.createContact);

// getting all your contacts
router.get('/', auth(), contactController.getAllContact);

// get a single contact
router.get('/:contactId', auth(), validate(contactValidation), contactController.getContactById);

// create a phonne number
router.post('/:contactId', auth(), validate(contactValidation.addPhoneBookToContact), contactController.addPhoneBookToContact)
router.delete('/:contactId', auth(), validate(contactValidation.getContactById), contactController.deleteContact);

// update contact and phonenumber
router.patch('/:contactId/phonebook/:phoneBookId', auth(), validate(contactController.updateContactAndPhoneNumber), contactController.updateContactAndPhoneNumber);

// I have not included validations
router.delete('/:contactId/phonebook/:phoneBookId', validate(contactValidation.deleteContactPhoneNumber), auth(), contactController.deletePhoneNumber);

module.exports = router;