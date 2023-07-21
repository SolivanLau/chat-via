import { FC } from 'react';
interface ChatMsgProps {
  isReceivingMsg: boolean;
  message: string;
}
const ChatMsg: FC<ChatMsgProps> = ({ isReceivingMsg, message }) => {
  return (
    <li className={isReceivingMsg ? `chatItem chatItemReceiving` : 'chatItem'}>
      <div className="chatItemContainer">
        <p className={isReceivingMsg ? `chatMsg receivingMsg` : 'chatMsg'}>
          {message}
        </p>
      </div>
    </li>
  );
};
export default ChatMsg;
