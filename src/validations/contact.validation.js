const Joi = require('joi');

const createContact = {
    body: Joi.object().keys({
        contact: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            nickName: Joi.string(),
            company: Joi.string(),
            website: Joi.string(),
            label: Joi.string(),
            birthday: Joi.date(),
            state: Joi.string(),
            street: Joi.string(),
            poBox: Joi.string(),
        }),
        phonebook: Joi.array().items(Joi.object({
            type: Joi.string(),
            phoneNumber: Joi.string().min(11).max(14).required(),
        }))
    })
};

const updateContact = {
    params: Joi.object().keys({
        contactId: Joi.number().required(),
        phoneBookId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        contact: Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            nickName: Joi.string(),
            company: Joi.string(),
            website: Joi.string(),
            label: Joi.string(),
            birthday: Joi.date(),
            state: Joi.string(),
            street: Joi.string(),
            poBox: Joi.string(),
        }),
        phonebook: Joi.array().items(Joi.object({
            type: Joi.string(),
            phoneNumber: Joi.string().min(11).max(14),
        }))
    })
};

const addPhoneBookToContact = {
    body: Joi.array().items(
        Joi.object({
            phoneNumber: Joi.string().required(),
            type: Joi.string()
        })
    )
}

const getContactById = {
    params: Joi.object().keys({
        contactId: Joi.number().required(),
    })
};

const deleteContactPhoneNumber = {
    params: Joi.object().keys({
        contactId: Joi.number().required(),
        phoneBookId: Joi.number().required()
    })
}



module.exports = {
    createContact,
    getContactById,
    updateContact,
    addPhoneBookToContact,
    deleteContactPhoneNumber
}