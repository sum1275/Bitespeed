import Contact from "../Model/Contact.js";
import { Op } from "sequelize";
// Get all contacts
export const addContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
      },
      order: [["linkPrecedence", "DESC"]],
    });

    if (contacts.length === 0) {
      await Contact.create({
        email: email,
        phoneNumber: phoneNumber,
        linkPrecedence: "primary",
      });
    } else {
      let count = 0;
      let contactExist = false;
      contacts.forEach((contact) => {
        if (contact.linkPrecedence === "primary") {
          count++;
        }
        if (contact.email === email && contact.phoneNumber === phoneNumber) {
          contactExist = true;
        }
      });
      if (contactExist !== true && count > 1) {
        const primary = contacts.find((contact) => contact.email === email);
        contacts.forEach(async (contact) => {
          if (contact.id !== primary.id) {
            // contact.linkPrecedence = "secondary";
            await Contact.update(
              { linkPrecedence: "secondary", linkedId: primary.id },
              { where: { id: contact.id } }
            );
          }
        });
        const check = { email: [], phoneNumber: [] };
        contacts.forEach((contact, index) => {
          if (contact.email === email) {
            check.email.push(index);
          }

          if (contact.phoneNumber === phoneNumber) {
            check.phoneNumber.push(index);
          }
        });
        if (check.email.length === 0) {
          const newContact = await Contact.create({
            email: email,
            phoneNumber: phoneNumber,
            linkPrecedence: "primary",
          });
          contacts.forEach(async (contact) => {
            if (contact.linkPrecedence === "primary") {
              await Contact.update(
                { linkPrecedence: "secondary", linkedId: newContact.id },
                { where: { id: contact.id } }
              );
            }
          });
        } else {
          const primaryIndex = check.email.find(
            (index) => contacts[index].linkPrecedence === "primary"
          );
          await Contact.create({
            email: email,
            phoneNumber: phoneNumber,
            linkedId: contacts[primaryIndex].id,
            linkPrecedence: "secondary",
          });
        }
      }
    }

    const updatedResponse = await Contact.findAll({
      where: {
        [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
      },
      order: [["linkPrecedence", "DESC"]],
    });
    const result = {
      contact: {
        primaryContactId: updatedResponse[0].id,
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      },
    };
    updatedResponse.forEach((contact) => {
      // console.log("contact--", contact);

      if (!result.contact.emails.includes(contact.email)) {
        result.contact.emails.push(contact.email);
      }
      if (!result.contact.phoneNumbers.includes(contact.phoneNumber)) {
        result.contact.phoneNumbers.push(contact.phoneNumber);
      }
      if (contact.linkPrecedence === "secondary") {
        result.contact.secondaryContactIds.push(contact.id);
      }
    });

    res.json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
