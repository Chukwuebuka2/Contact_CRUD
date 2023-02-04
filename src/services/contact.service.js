const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');
const { isPhoneNumberTaken } = require('../services/phonebook.services')

const createContact = async (contactBody, phoneBookBody, userId) => {
    // assign the user id to the contactBody request
    Object.assign(contactBody, { userId: userId })
    // create the contact

    // check if the phone number has been taken
    // map out the phonebook data cos its a list 
    // phoneBookBody.map(data => {
    //     if (await isPhoneNumberTaken())
    // })
    const contact = await db.contacts.create(contactBody);
    // create the various phone numbers
    return await addPhoneBookToNumber(contact.id, phoneBookBody);
}

const getContactById = async (contactId) => {
    return await db.contacts.findOne({
        where: {
            id: contactId
        },
        include: {
            model: db.phoneBook,
        },
        attributes: ['id', 'firstName', 'lastName', 'nickName', 'company',
         'website', 'label', 'relationship', 'birthday', 'state',
          'street', 'poBox', 'userId']
    });
}

const getAllContact = async (userId) => {
    return await db.contacts.findAll({
        where: {
            userId
        },
        attributes: ['id', "firstName", "lastName"],
        include: [{
            model: db.phoneBook,
            attributes: ['id', "phoneNumber", "type"]
        }],
        // exclude: ['contactPhoneNumbers']
    })
}

const updateContact = async (contactId, contactBody, phoneBookBody, phoneBookId, userId) => {

    // first check if the user is the owner of the contact
    // checking if the phone number has been chosen
    // if (await isPhoneNumberTaken(phoneBookBody.phoneNumber)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Phone number has been taken already");
    // }
    const contact = await getContactById(contactId);
    // logger.info(contact.dataValues.userId); logger.info(userId)
    if (contact.dataValues.userId !== userId){
        throw new ApiError(httpStatus.BAD_REQUEST, "Contact does not exist");
    }
    // if yes, then we will update the contact table
    await db.contacts.update(contactBody, {
        where: { id: contactId }
    });
    // now let's check if the phone number wants to be updated too
    
    if (phoneBookBody.phoneNumber !== null) {
        // lets callect all the phonebook ids
        const phonebooks = JSON.parse(JSON.stringify(await contact.dataValues.phonebooks))
        const phoneBook = await getPhoneBookById(phoneBookId);
        const phoneBookIds = phonebooks.map(obj => obj.id);
        for (let i = 0; i < phoneBookIds.length; i++) {
            // lets know which phone number wants to be updated
            if (phoneBook.dataValues.id == phoneBookIds[i]){
                await db.phoneBook.update({ phoneNumber: phoneBookBody.phoneNumber }, {
                    where: {
                        id: phoneBook.dataValues.id
                    }
                });
                break;
            } 
        }
    }

    if (phoneBookBody.type !== null) {
        // lets callect all the phonebook ids
        const phonebooks = JSON.parse(JSON.stringify(await contact.dataValues.phonebooks))
        const phoneBook = await getPhoneBookById(phoneBookId);
        const phoneBookIds = phonebooks.map(obj => obj.id);
        for (let i = 0; i < phoneBookIds.length; i++) {
            // lets know which phone number wants to be updated
            
            if (phoneBook.dataValues.id == phoneBookIds[i]){
                await db.phoneBook.update({ type: phoneBookBody.type }, {
                    where: {
                        id: phoneBook.dataValues.id
                    }
                });
                break;
            } 
            
        }
    }
    return await getContactById(contactId);
}
// try DRY principle here

const getPhoneBookById = async (phoneBookId) => {
    return await db.phoneBook.findOne({
        where: {
            id: phoneBookId
        },
        include: {
            model: db.contacts,
        }
    });
}

const addPhoneBookToNumber = async (id, phoneBookBody) => {
    // if (await isPhoneNumberTaken(phoneBookBody.phoneNumber)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Phone number has been taken already");
    // }
    const contact = await getContactById(id);
    // create the various phone numbers
    const phoneBooks = await db.phoneBook.bulkCreate(phoneBookBody);

    // now lets update it in the join table
    const contactId = contact.dataValues.id;
    // create a list of the phonenumbers we are tring to add
    const phoneBookIds = [];
    // pushing all the id in the empty list
    for (let i = 0; i < phoneBooks.length; i++) {
        phoneBookIds.push(phoneBooks[i].id);
    }
    // adding data to the join table
    await contact.addPhonebooks(phoneBookIds);

    // returning the details we have gotten 
    return await getContactById(contactId)
}

const deleteContactPhoneNumber = async (contactId, phonebookId) => {
    // first find the contact
    const contact = await getContactById(contactId);
    // delete the association in the join database
    if (!contact){ 
        throw new ApiError(httpStatus.NOT_FOUND, "Contact does not exist")
    }

    const phoneBook = await getPhoneBookById(phonebookId);

    if (!phoneBook) {
        throw new ApiError(httpStatus.NOT_FOUND, "phone book not found")
    }
    await contact.removePhonebooks(phonebookId)
    return await deletePhoneNumber(phonebookId)
}

const deletePhoneNumber = async (phoneBookId) => {
    return await db.phoneBook.destroy({
        where: { id: phoneBookId }
    })
}

const deleteContact = async (contactId) => {
    return await db.contacts.destroy({
        where: {
            id: contactId
        },
        include: [{
            model: db.phoneBook,
            through: {
                model: 'contactPhoneNumbers'
            }
        }]
    })
}



module.exports = {
    createContact,
    getContactById,
    getAllContact,
    updateContact,
    getPhoneBookById,
    addPhoneBookToNumber,
    deleteContactPhoneNumber,
    deletePhoneNumber,
    deleteContact
}