import { FC, ReactElement } from 'react';

interface SidebarIconProps {
  icon: ReactElement;
  popup: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarIcon: FC<SidebarIconProps> = ({
  icon,
  popup,
  setActiveTab,
  activeTab,
}) => {
  return (
    <button
      onClick={() => setActiveTab(popup)}
      className={activeTab === popup ? 'sidebarIconActive' : ''}
    >
      <div className="sidebarIconContainer">{icon}</div>
      <span className="iconPopup">{popup}</span>
    </button>
  );
};
export default SidebarIcon;
