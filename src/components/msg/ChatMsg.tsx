import { FC } from 'react';
interface ChatMsgProps {
  isReceivingMsg: boolean;
  message: string;
}
const ChatMsg: FC<ChatMsgProps> = ({ isReceivingMsg, message }) => {
  return (
    <div className="chatMsgContainer">
      <p className={isReceivingMsg ? `chatMsg receivingMsg` : 'chatMsg'}>
        {message}
      </p>
    </div>
  );
};
export default ChatMsg;
