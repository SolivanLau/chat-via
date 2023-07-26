// REACT LIBRARIES
import { FC, FormEvent, useState } from 'react';
// CUSTOM HOOKS
import { useSendMsg } from '../../firebase/dbHooks';
import { useAppSelector } from '../../state/stateHooks';
// COMPONENTS
import MsgBtn from './MsgBtn';
// ASSETS
import {
  RiSendPlane2Fill,
  RiImageFill,
  RiEmojiStickerLine,
  RiFileAddLine,
} from 'react-icons/ri';

interface MsgFormProps {}

const MsgForm: FC<MsgFormProps> = ({}) => {
  const authState = useAppSelector((state) => state.auth);
  // MSG TEXT INPUT
  const [msg, setMsg] = useState('');
  // FORM SUBMIT HANDLER
  const handleSubmit = (e: FormEvent) => {
    // prevent default
    e.preventDefault();
    useSendMsg(msg, authState.uid);
    setMsg('');
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
