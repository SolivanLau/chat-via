import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import ChatMsg from './ChatMsg';
import { useAppSelector } from '../../state/stateHooks';
export interface dbChatMsg {
  id?: string;
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

interface groupedMsgs {
  [key: string]: dbChatMsg[];
}
const ChatContainer = () => {
  const [chatLog, setChatLog] = useState<groupedMsgs>({});

  const { uid } = useAppSelector((state) => state.auth);

  const chatRef = ref(db, '/chatTest');

  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      // Check if the snapshot exists and contains data
      if (snapshot.exists()) {
        // Extract all objects from the snapshot
        const data = snapshot.val();

        // create array and map to include obj key as id variable
        const dataArray = Object.entries(data).map(([id, obj]) => ({
          id,
          ...(obj as dbChatMsg),
        }));

        // sort and reduce method to create
        const groupedMsgs = dataArray
          .sort((a, b) => {
            const dateA = new Date(
              a.timeStamp.year,
              a.timeStamp.month - 1,
              a.timeStamp.day
            );
            const dateB = new Date(
              b.timeStamp.year,
              b.timeStamp.month - 1,
              b.timeStamp.day
            );

            return dateA.getTime() - dateB.getTime();
          })
          .reduce((acc, msg) => {
            const dateKey = `${msg.timeStamp.day}-${
              msg.timeStamp.month > 10
                ? msg.timeStamp.month
                : `0` + msg.timeStamp.month
            }-${msg.timeStamp.year}`;

            if (!acc[dateKey]) {
              acc[dateKey] = [msg];
            } else {
              acc[dateKey].push(msg);
            }
            return acc;
          }, {} as groupedMsgs);

        // set to chatlog state
        setChatLog(groupedMsgs);
      } else {
        // The snapshot doesn't exist or has no data
        console.log('No data available.');
      }
    });
  }, []);

  return (
    <ul className="chatContainer customScrollbar">
      {/* CHAT MAP VIA DATE */}
      {Object.keys(chatLog).map((date, index) => {
        return (
          <li key={index}>
            <h4 className="chatDateDivider">{date}</h4>

            {/* MSG MAP VIA TIME*/}
            <ul>
              {chatLog[date].map((msg) => {
                const { id, message, sentBy, timeStamp } = msg;
                return (
                  <ChatMsg
                    key={id}
                    isReceivingMsg={sentBy === uid ? false : true}
                    message={message}
                    timeStamp={timeStamp}
                  />
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
export default ChatContainer;
