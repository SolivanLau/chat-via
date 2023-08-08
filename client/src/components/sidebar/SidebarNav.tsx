import { FC, useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAppDispatch } from '../../state/stateHooks';
import { clearUserInfo } from '../../state/authSlice';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const SidebarNav: FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
  const dispatch = useAppDispatch();

  const [isLightMode, setIsLightMode] = useState(false);

  const handleLogout = () => {
    useLogout();
    dispatch(clearUserInfo());
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
