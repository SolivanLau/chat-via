import { FC, useState } from 'react';
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

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const SidebarNav: FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
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
          <SidebarIcon
            icon={<RiUserLine />}
            popup="profile"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </li>
        <li className="featuresItem">
          <SidebarIcon
            icon={<RiMessage3Line />}
            popup="chats"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </li>

        <li className="featuresItem">
          <SidebarIcon
            icon={<RiGroupLine />}
            popup="groups"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </li>
        <li className="featuresItem">
          <SidebarIcon
            icon={<RiContactsLine />}
            popup="contacts"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </li>
        <li className="featuresItem">
          <SidebarIcon
            icon={<RiSettings3Line />}
            popup="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </li>

        <li
          className="featuresItem"
          onClick={() => setIsLightMode(!isLightMode)}
        >
          <SidebarIcon
            icon={isLightMode ? <RiSunLine /> : <RiMoonLine />}
            popup={`dark mode`}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
