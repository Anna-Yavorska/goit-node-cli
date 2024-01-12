const contacts = require("./contacts.js")

const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contacts.getContactById();
      console.log("ContactById: ", contactById)
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log("NewContact: ", newContact)
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log("DeletedContact:", deletedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
