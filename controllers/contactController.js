const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts =  asyncHandler( async  (req, res) => {
    const contact = await Contact.find({user_Id: req.user.id});
    res.status(200).json(contact);
});


//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler( async(req, res) => {
    console.log(`The request body is`, req.body);
    const {name, email,phone } = req.body;
    if (!name, !email, !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_Id: req.user_Id
    });
     res.status(201).json({message:`Create contact`})
});
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req,res) => {
const contact = await Contact.findById(req.params.id)
if (!contact){
    res.status(404);
    throw new Error("Contact not found");
}
res.status(200).json(contact)
});
//@desc Get all contacts
//@route PUT /api/contacts
//@access public
const updateContact = asyncHandler( async  (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_Id.toString()  !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
});
//@desc Get all contacts
//@route DELETE /api/contacts
//@access public
const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
if (!contact){
    res.status(404);
    throw new Error("Contact not found");
}
if (contact.user_Id.toString()  !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contacts")
}
await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact)
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};