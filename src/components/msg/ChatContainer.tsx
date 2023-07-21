import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import ChatMsg from './ChatMsg';

const ChatContainer = () => {
  const [chatLog, setChatLog] = useState([]);

  const chatRef = ref(db, '/chatTest');

  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      // Check if the snapshot exists and contains data
      if (snapshot.exists()) {
        // Extract all objects from the snapshot's value
        const data = snapshot.val();
        const dataArray: any = Object.values(data);
        setChatLog(dataArray);
      } else {
        // The snapshot doesn't exist or has no data
        console.log('No data available.');
      }
    });
  }, []);

  return (
    <ul className="chatContainer">
      {chatLog.map((msg) => {
        const { message } = msg;
        return <ChatMsg isReceivingMsg={false} message={message} />;
      })}
    </ul>
  );
};
export default ChatContainer;
