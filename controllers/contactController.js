
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel.js');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ userId: req.user.id });
  res.status(200).json(contacts);
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body || {};
  console.log('Request Body:', req.body);
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  console.log('Creating contact for user:', req.user.id);
  const contact = await Contact.create({
    userId:req.user.id,
    name,
    email,
    phone,

  });
  res.status(201).json(contact);
});

// @desc    Get contact by ID
// @route   GET /api/contacts/:id
// @access  Private
const getContact = asyncHandler(async (req, res) => {
  console.log('Fetching contact with ID:', req.params.id);
  const contact = await Contact.find({ userId: req.params.id});
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ userId: req.params.id});
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if(contact.userId.toString() !== req.user.id){
    res.status(403);
    throw new Error('User do not authorized to update this contact');
  }

  const updatedContact = await Contact.updateOne(
  { userId: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ userId: req.params.id});
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

    if(contact.userId.toString() !== req.user.id){
    res.status(403);
    throw new Error('User do not authorized to update this contact');
  }

  await Contact.deleteOne({ userId: req.params.id});
  res.status(200).json({ message: 'Contact deleted' });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};