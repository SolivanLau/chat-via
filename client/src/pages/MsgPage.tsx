import { useState, FC } from 'react';
import SidebarNav from '../components/sidebar/SidebarNav';
import MsgContainer from '../components/msg/MsgContainer';
import {
  ChatsTab,
  ContactsTab,
  GroupsTab,
  ProfileTab,
  SettingsTab,
} from '../tabs';

interface tabComponentMapInterface {
  [key: string]: FC;
}

const MsgPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [activeChat, setActiveChat] = useState();

  const tabComponentMap: tabComponentMapInterface = {
    profile: ProfileTab,
    chats: ChatsTab,
    groups: GroupsTab,
    contacts: ContactsTab,
    settings: SettingsTab,
  };

  const TabComponent = tabComponentMap[activeTab];
  return (
    <div className="msgPage">
      {/* sidebar */}
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* tab content*/}
      <div className="sidebar tabContainer">
        <TabComponent />
      </div>
      <MsgContainer />
    </div>
  );
};
export default MsgPage;
