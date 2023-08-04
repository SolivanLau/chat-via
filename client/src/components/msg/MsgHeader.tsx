import { FC } from 'react';
import {
  RiSearchLine,
  RiPhoneFill,
  RiVideoAddFill,
  RiContactsLine,
} from 'react-icons/ri';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import MsgBtn from './MsgBtn';
// INTERFACE
interface MsgHeaderProps {}

// FC
const MsgHeader: FC<MsgHeaderProps> = () => {
  return (
    <header className="msgHeader">
      <div className="msgHeaderContactContainer">
        {/* CONTACT REACT COMPONENT */}
      </div>
      <div className="msgHeaderBtnContainer">
        {/* SEARCH BTN */}
        <button className="msgHeaderBtn"></button>
        <MsgBtn
          icon={<RiSearchLine />}
          isSubmit={false}
          isPopupBelow={true}
          popup="Search"
        />
        {/* CALL BTN */}
        <MsgBtn
          icon={<RiPhoneFill />}
          isSubmit={false}
          isPopupBelow={true}
          popup="Call"
        />
        {/* VIDEO CALL BTN */}

        <MsgBtn
          icon={<RiVideoAddFill />}
          isSubmit={false}
          isPopupBelow={true}
          popup="Video"
        />
        {/* CONTACT PROFILE BTN */}
        <MsgBtn
          icon={<RiContactsLine />}
          isSubmit={false}
          isPopupBelow={true}
          popup="Profile"
        />

        {/* SETTINGS BTN */}
        <MsgBtn
          icon={<BiDotsVerticalRounded />}
          isSubmit={false}
          isPopupBelow={true}
          popup="Settings"
        />
      </div>
    </header>
  );
};
export default MsgHeader;
