const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');
const logger = require('../config/logger');

const createContact = catchAsync(async (req, res) => {
    // lets separate the request
    const contact = await contactService.createContact(req.body.contact, req.body.phonebook, req.userId);
    if (!contact) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Bad imput")
    }
    res.status(httpStatus.CREATED).json(contact);
});

const getAllContact = catchAsync(async (req, res) => {
    const contacts = await contactService.getAllContact(req.userId);
    res.status(httpStatus.OK).json(contacts)
})

const getContactById = catchAsync(async (req, res) => {
    // we have to check if the user that is requesting for 
    // that contact was the one that craeted the contact else bounce him back,
    //  that he does not have such contact

    // modularize this code
    const contact = await contactService.getContactById(req.params.contactId);
    // checking
    if (contact.userId == null) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact not found")
    }
    if (contact.userId !== req.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This is not your contact")
    }
    res.status(httpStatus.OK).json(contact);
});

const updateContactAndPhoneNumber = catchAsync(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);
    // checking
    if (contact.userId == null) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact not found")
    }
    if (contact.userId !== req.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This is not your contact")
    }
    res.status(httpStatus.OK).json(await contactService.updateContact(req.params.contactId, req.body.contact, req.body.phonebook, req.params.phoneBookId, req.userId))
})

const addPhoneBookToContact = catchAsync(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);// checking
    if (contact.userId == null) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact not found")
    }
    if (contact.userId !== req.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This is not your contact")
    }
    res.status(httpStatus.OK).json(await contactService.addPhoneBookToNumber(req.params.contactId, req.body));
});

const deletePhoneNumber = catchAsync(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);// checking
    if (contact.userId !== req.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This is not your contact")
    }
    if (contact.userId == null) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact not found")
    }
    res.status(httpStatus.OK).json(await contactService.deleteContactPhoneNumber(req.params.contactId, req.params.phoneBookId))
});

const deleteContact = catchAsync(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);// checking
    if (contact.userId !== req.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This is not your contact")
    }
    if (contact.userId == null) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact not found")
    }
    res.status(httpStatus.OK).json(await contactService.deleteContact(req.params.contactId));
})

module.exports = {
    createContact,
    getAllContact,
    getContactById,
    updateContactAndPhoneNumber,
    addPhoneBookToContact,
    deletePhoneNumber,
    deleteContact
}
