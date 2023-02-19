import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import initialContacts from 'db/initialContacts.json';
import { ContactForm, Filter, ContactList } from 'components';
import {
  StyledContactsBox,
  StyledContainer,
  StyledWrapper,
} from './App.styled';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(10),
    };

    const isExistName = this.state.contacts
      .map(contact => contact.name.toLowerCase())
      .includes(newContact.name.toLowerCase());

    const message = `${newContact.name} is already in contacts`;

    isExistName
      ? alert(message)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const { addContact, deleteContact, handleInputChange, getVisibleContacts } =
      this;
    const visibleContacts = getVisibleContacts();

    return (
      <StyledWrapper>
        <StyledContainer>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={addContact} />

          <StyledContactsBox>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={handleInputChange} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={deleteContact}
            />
          </StyledContactsBox>
        </StyledContainer>
      </StyledWrapper>
    );
  }
}
