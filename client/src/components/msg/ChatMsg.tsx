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
  // TIME STAMP FUNC
  const generateTimeStamp = () => {
    const { minute, hour } = timeStamp;
    // FORMAT TIMESTAMP TO 12H
    const amPm = hour > 12 ? `pm` : 'am';
    const hourFormat = `${hour % 12 === 0 ? 12 : hour % 12}`;
    const minFormat = minute < 10 ? `0${minute}` : `${minute}`;

    const timeStampFormat = `${hourFormat}:${minFormat}${amPm}`;
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
