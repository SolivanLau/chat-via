import { FC } from 'react';
import { RiTimeLine } from 'react-icons/ri';
interface ChatMsgProps {
  // key: string;
  isReceivingMsg: boolean;
  message: string;
  timeStamp: {
    day: number;
    hour: number;
    minute: number;
    month: number;
    year: number;
    timezone: string;
  };
}
const ChatMsg: FC<ChatMsgProps> = ({ isReceivingMsg, message, timeStamp }) => {
  const generateTimeStamp = () => {
    // CURRENT DATE
    const today = new Date();

    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const todayDate = `${todayDay}/${todayMonth}/${todayYear}`;

    const { minute, hour, day, month, year } = timeStamp;

    const timeStampDate = `${day}/${month}/${year}`;

    // FORMAT TIMESTAMP TO 12H
    const amPm = hour > 12 ? `pm` : 'am';
    const hourFormat = `${hour % 12 === 0 ? 12 : hour % 12}`;
    const minFormat = minute < 10 ? `0${minute}` : `${minute}`;

    const timeStampFormat = `${hourFormat}:${minFormat}${amPm}`;

    // if date is different
    if (timeStampDate !== todayDate) {
      return `${timeStampDate}, ${timeStampFormat}`;
    }

    return timeStampFormat;
  };

  return (
    <li className={isReceivingMsg ? `chatItemReceiving` : 'chatItemSending'}>
      <div className="chatItemContainer">
        {/* CHAT BUBBLE */}
        <div className={isReceivingMsg ? `chatMsgReceiving` : 'chatMsgSending'}>
          <p>{message}</p>
          <p className="timeStamp">
            <RiTimeLine />
            {generateTimeStamp()}
          </p>
        </div>
        {/* SENT FROM */}
      </div>
    </li>
  );
};
export default ChatMsg;
