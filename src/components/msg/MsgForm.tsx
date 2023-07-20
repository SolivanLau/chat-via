import { FC, FormEvent, useState } from 'react';
import {
  RiSendPlane2Fill,
  RiImageFill,
  RiEmojiStickerLine,
  RiFileAddLine,
} from 'react-icons/ri';
import MsgBtn from './MsgBtn';

interface MsgFormProps {}
const MsgForm: FC<MsgFormProps> = ({}) => {
  // MSG TEXT INPUT
  const [msg, setMsg] = useState('');
  // FORM SUBMIT HANDLER
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(msg);
  };
  return (
    <form onSubmit={handleSubmit} className="msgForm">
      <div className="msgFromInputContainer">
        <input
          type="text"
          placeholder="Enter message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <div className="msgBtnContainer">
        {/* EMOJI BTN */}
        <MsgBtn icon={<RiEmojiStickerLine />} popup="Emoji" isSubmit={false} />

        {/* ADD FILE BTN */}

        <MsgBtn icon={<RiFileAddLine />} popup="Add file" isSubmit={false} />

        {/* ATTACH IMAGE */}
        <MsgBtn icon={<RiImageFill />} popup="Image" isSubmit={false} />

        {/* SEND BUTTON */}
        <MsgBtn
          icon={<RiSendPlane2Fill />}
          additionalClass="msgSendBtn"
          isSubmit={true}
        />
      </div>
    </form>
  );
};
export default MsgForm;
