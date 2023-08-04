import { get, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../state/stateHooks';
import { db } from '../firebase/firebase';
const ChatsTab = () => {
  const { uid } = useAppSelector((state) => state.auth);
  const userRef = ref(db, `/users/${uid}/chats`);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatData = snapshot.val();
        const chatIdArray = Object.values(chatData);

        const chatArr = chatIdArray.map((chat) => {});
      }
    });
  }, []);
  return (
    <section className="contactsTab">
      <header className="tabHeader tabItem">
        <h1>Chats</h1>
      </header>
      <ul className="contactsList tabItem customScrollbar"></ul>
    </section>
  );
};
export default ChatsTab;
