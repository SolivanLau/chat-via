import { FC, ReactElement } from 'react';

interface SidebarIconProps {
  icon: ReactElement;
  popup: string;
}

const SidebarIcon: FC<SidebarIconProps> = ({ icon, popup }) => {
  return (
    <>
      <div className="sidebarIconContainer">{icon}</div>
      <span className="iconPopup">{popup}</span>
    </>
  );
};
export default SidebarIcon;
