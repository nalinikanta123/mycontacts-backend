const express = require('express');

const router = express.Router();

const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');

const validateTokenHandler = require('../middleware/validateTokenHandler');

router.use(validateTokenHandler);
// Example route: Get all contacts, create a new contact
router.route('/').get(getContacts).post(createContact);

// Example route: Get a contact by ID, update a contact by ID, delete a contact by ID
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;