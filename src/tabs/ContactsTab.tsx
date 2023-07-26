import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { RiUserAddLine } from 'react-icons/ri';
interface UserData {
  id: string;
  email: string;
  name: string;
}

interface GroupedContacts {
  [letter: string]: string[];
}
const ContactsTab = () => {
  const [contactList, setContactList] = useState<GroupedContacts>({});
  useEffect(() => {
    const usersRef = ref(db, '/users');

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data: { [key: string]: any } = snapshot.val();
        const dataArray = Object.entries(data).map(([key, value]) => ({
          uid: key,
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
      <header className="tabHeader">
        <div className="tabWrapper">
          <h1>Contacts</h1>
          <button className="iconBtn">
            <RiUserAddLine />
          </button>
        </div>
      </header>
      <ul className="contactsList">
        {Object.keys(contactList).map((letter, index) => {
          const firstLetter = letter as keyof GroupedContacts;
          return (
            <li key={index}>
              <h4>{firstLetter}</h4>
              <ul>
                {contactList[letter].map((contact: any) => {
                  return (
                    <li>
                      <h4>{contact.name}</h4>
                    </li>
                  );
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
