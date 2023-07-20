import { FC } from 'react';

interface ProfileIconProps {
  icon: string;
  alt?: string;
}
const ProfileIcon: FC<ProfileIconProps> = ({ icon, alt }) => {
  return (
    <>
      <div className="profileIconContainer">
        <img src={icon} alt={alt ? alt : `a profile picture`} />
      </div>
    </>
  );
};
export default ProfileIcon;
