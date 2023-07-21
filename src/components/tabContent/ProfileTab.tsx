import { RiMore2Fill } from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
import tempAvatar from '../../assets/avatar-7.jpg';
import ProfileIcon from './ProfileIcon';
import { useAppSelector } from '../../state/stateHooks';
const ProfileTab = () => {
  const { email, name } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="profileTab">
        {/* TAB HEADER */}
        <header className="tabHeader">
          <div className="tabWrapper">
            <h1>My Profile</h1>
            <button className="iconBtn">
              <RiMore2Fill />
            </button>
          </div>
        </header>

        <ProfileIcon icon={tempAvatar} />
        <div className="profileInfo">
          <div className="tabWrapper">
            <h2>{name}</h2>
            <div className="profileActiveStatus">
              <div className="avtiveIconContainer">
                <BsDot />
              </div>
              <p>Active</p>
            </div>
          </div>
        </div>

        <div className="profileBio">
          <div className="tabWrapper">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
              quis eos iure, enim voluptates similique consequatur deleniti eius
              provident molestiae!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileTab;
