import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { RiUserAddLine } from 'react-icons/ri';
import ContactName from '../components/tabContent/ContactName';
import { useAppSelector } from '../state/stateHooks';
import { useGetUsers } from '../firebase/authHooks';
export interface UserData {
  uid: string;
  email: string;
  userName: string;
}

export interface GroupedContacts {
  [letter: string]: string[];
}
const ContactsTab = () => {
  const { token, uid } = useAppSelector((state) => state.auth);

  const { isLoadingContacts, contactData } = useGetUsers(token, uid);

  return (
    <section className="contactsTab">
      <header className="tabHeader tabItem">
        <h1>Contacts</h1>
        <button className="iconBtn">
          <RiUserAddLine />
        </button>
      </header>
      <ul className="contactsList tabItem customScrollbar">
        {Object.keys(contactData).map((letter, index) => {
          const firstLetter = letter as keyof GroupedContacts;

          return (
            <li key={index} className="contactItem">
              <h4 className="contactLetter">{firstLetter}</h4>
              <ul>
                {contactData[letter].map((contact: any) => {
                  const { uid, userName } = contact;
                  return <ContactName key={uid} id={uid} name={userName} />;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default ContactsTab;
