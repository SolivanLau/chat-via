import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import ChatMsg from './ChatMsg';
import { useAppSelector } from '../../state/stateHooks';
export interface dbChatMsg {
  message: string;
  sentBy: string;
  timeStamp: {
    day: number;
    hour: number;
    minute: number;
    month: number;
    year: number;
    timezone: string;
  };
}

const ChatContainer = () => {
  const [chatLog, setChatLog] = useState([]);

  const { uid } = useAppSelector((state) => state.auth);

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
      {chatLog.map((msg: dbChatMsg) => {
        const { message, sentBy, timeStamp } = msg;
        return (
          <ChatMsg
            isReceivingMsg={sentBy === uid ? false : true}
            message={message}
            timeStamp={timeStamp}
          />
        );
      })}
    </ul>
  );
};
export default ChatContainer;
