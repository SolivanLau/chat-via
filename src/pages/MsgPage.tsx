import SidebarNav from '../components/sidebar/SidebarNav';
import ProfileTab from '../components/tabContent/ProfileTab';
import MsgContainer from '../components/msg/MsgContainer';
const MsgPage = () => {
  // const observeAuth = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log('user signed in! :)');
  //     } else {
  //       console.log('user not signed in :(');
  //       navigate('/auth');
  //     }
  //   });
  // };

  // observeAuth();
  return (
    <div className="msgPage">
      {/* sidebar */}
      <SidebarNav />
      {/* tab content*/}
      <div className="sidebar tabContainer">
        <ProfileTab />
      </div>
      <MsgContainer />
    </div>
  );
};
export default MsgPage;
