import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { RiUserAddLine } from 'react-icons/ri';
import ContactName from '../components/tabContent/ContactName';
interface UserData {
  id: string;
  email: string;
  name: string;
}

interface GroupedContacts {
  [letter: string]: string[];
}
const ContactsTab = () => {
  // CONTACT LIST USESTATE
  const [contactList, setContactList] = useState<GroupedContacts>({});

  useEffect(() => {
    // database reference
    const usersRef = ref(db, '/users');

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data: { [key: string]: any } = snapshot.val();

        const dataArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        const groupContacts: GroupedContacts = dataArray
          .sort((a, b) => a.name.localeCompare(b.name))
          .reduce((acc, contact) => {
            const firstLetter = contact.name.charAt(0).toUpperCase();

            // if first letter is NOT already in acc {}
            if (!acc[firstLetter]) {
              // create a new key with firstLetter and array with contact info
              acc[firstLetter] = [contact];
            } else {
              // push contact into pre-existing firstLetter array
              acc[firstLetter].push(contact);
            }
            return acc;
          }, {} as { [key: string]: UserData[] });

        setContactList(groupContacts);
      } else {
        throw new Error('no data at current reference point');
      }
    });
  }, []);

  return (
    <section className="contactsTab">
      <header className="tabHeader tabItem">
        <h1>Contacts</h1>
        <button className="iconBtn">
          <RiUserAddLine />
        </button>
      </header>
      <ul className="contactsList tabItem customScrollbar">
        {Object.keys(contactList).map((letter, index) => {
          const firstLetter = letter as keyof GroupedContacts;

          return (
            <li key={index} className="contactItem">
              <h4 className="contactLetter">{firstLetter}</h4>
              <ul>
                {contactList[letter].map((contact: any) => {
                  const { id, name } = contact;
                  return <ContactName key={id} id={id} name={name} />;
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
