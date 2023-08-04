import { RiMore2Fill } from 'react-icons/ri';
import { useAppSelector } from '../state/stateHooks';
import ProfileIcon from '../components/tabContent/ProfileIcon';
import { BsDot } from 'react-icons/bs';
import tempAvatar from '../assets/avatar-7.jpg';

const ProfileTab = () => {
  const { email, name } = useAppSelector((state) => state.auth);

  return (
    <>
      <section className="profileTab">
        {/* TAB HEADER */}
        <header className="tabHeader">
          <h1>My Profile</h1>
          <button className="iconBtn">
            <RiMore2Fill />
          </button>
        </header>

        <div className="profileInfo tabItem">
          <ProfileIcon icon={tempAvatar} />
          <h2>{name}</h2>
          <div className="profileActiveStatus">
            <div className="activeIconContainer">
              <BsDot />
            </div>
            <p>Active</p>
          </div>
        </div>

        <div className="profileBio tabItem">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum quis
            eos iure, enim voluptates similique consequatur deleniti eius
            provident molestiae!
          </p>
        </div>
      </section>
    </>
  );
};
export default ProfileTab;
