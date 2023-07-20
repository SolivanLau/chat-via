import { useState } from 'react';
import { LogoMain } from '../../assets/Svgs';
import {
  RiContactsLine,
  RiMessage3Line,
  RiGroupLine,
  RiUserLine,
  RiMoonLine,
  RiSunLine,
  RiSettings3Line,
} from 'react-icons/ri';
import tempAvatar from '../../assets/avatar-7.jpg';
import SidebarIcon from './SidebarIcon';
import ProfileIcon from '../tabContent/ProfileIcon';
import { useLogout } from '../../firebase/authHooks';

const SidebarNav = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const handleLogout = () => {
    useLogout();
  };
  return (
    <nav className="sidebar sidebarNav">
      <ul className="featuresList">
        <li className="logoMain featuresItem">
          <div className="sidebarIconContainer">
            <LogoMain />
          </div>
        </li>
        <li className="featuresItem">
          <SidebarIcon icon={<RiUserLine />} popup="Profile" />
        </li>
        <li className="featuresItem">
          <SidebarIcon icon={<RiMessage3Line />} popup="Chats" />
        </li>

        <li className="featuresItem">
          <SidebarIcon icon={<RiGroupLine />} popup="Groups" />
        </li>
        <li className="featuresItem">
          <SidebarIcon icon={<RiContactsLine />} popup="Contacts" />
        </li>
        <li className="featuresItem">
          <SidebarIcon icon={<RiSettings3Line />} popup="Settings" />
        </li>

        <li
          className="featuresItem"
          onClick={() => setIsLightMode(!isLightMode)}
        >
          <SidebarIcon
            icon={isLightMode ? <RiSunLine /> : <RiMoonLine />}
            popup={isLightMode ? `Light mode` : `Dark mode`}
          />
        </li>
        <li className="featuresItem" onClick={handleLogout}>
          {/* NEED update w profile icon */}
          <ProfileIcon icon={tempAvatar} />
        </li>
      </ul>
    </nav>
  );
};
export default SidebarNav;
