import { Router } from 'express';
import { ValidationError } from 'sequelize';

import { Contacts } from '../models/contacts';

export const contactsRouter = Router();

const formatErrors = (error: ValidationError) => {
  const formattedErrors: Record<string, string> = {};

  error.errors.forEach((e) => {
    if (e.path) {
      formattedErrors[e.path] = e.message;
    }
  });

  return formattedErrors;
};

contactsRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const contact = await Contacts.create({ firstName, lastName, phoneNumber });
    console.log('Contact created successfully', contact);
    return res.status(200).json(contact);
  } catch (error) {
    if (error instanceof ValidationError) {
      const formattedErrors = formatErrors(error);
      return res.status(400).json({
        errors: formattedErrors,
      });
    }
  }
});

contactsRouter.get('/', async (_req, res) => {
  const allContacts: Contacts[] = await Contacts.findAll();

  return res.status(200).json(allContacts);
});

contactsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber } = req.body;
    await Contacts.update(
      { firstName, lastName, phoneNumber },
      { where: { id } },
    );
    const updatedContact: Contacts | null = await Contacts.findByPk(id);
    return res.status(200).json(updatedContact);
  } catch (error) {
    if (error instanceof ValidationError) {
      const formattedErrors = formatErrors(error);
      return res.status(400).json({
        errors: formattedErrors,
      });
    }
  }
});

contactsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedContact: Contacts | null = await Contacts.findByPk(id);
  await Contacts.destroy({ where: { id } });

  return res.status(200).json(deletedContact);
});
