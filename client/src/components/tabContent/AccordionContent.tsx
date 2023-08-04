import { FC } from 'react';
// INTERFACES
interface ProfileAboutProps {
  name: string;
  email: string;
  location?: string;
}

interface SettingPrivacyProps {
  profilePhoto: boolean;
  lastSeen: boolean;
  status: boolean;
  readReceipt: boolean;
  groups: boolean;
}

interface SettingSecurityProps {
  securityNotification: boolean;
}

interface SettingHelpProps {
  faq: string;
  contact: string;
  termsPolicy: string;
}
// REUSABLE FUNCTIONS
const currentTime = (): string => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amOrPm = hours >= 12 ? 'pm' : 'am';

  // 12hr format
  hours = hours % 12 || 12;

  // adding leading 0 to single digit nums
  const formattedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}:${formattedMins} ${amOrPm}`;
};

export const ProfileAbout: FC<ProfileAboutProps> = ({
  name,
  email,
  location,
}) => {
  return (
    <ul className="accordionContentList accordionAboutList">
      <li className="accordionContentItem accordionAboutItem">
        <h4>Name</h4>
        <p>{name}</p>
      </li>
      <li className="accordionContentItem accordionAboutItem">
        <h4>Email</h4>
        <p>{email}</p>
      </li>
      <li className="accordionContentItem accordionAboutItem">
        <h4>Time</h4>
        <p>{currentTime()}</p>
      </li>
      <li className="accordionContentItem accordionAboutItem">
        <h4>Location</h4>
        <p>{location}</p>
      </li>
    </ul>
  );
};

export const SettingPrivacy: FC<SettingPrivacyProps> = ({
  profilePhoto,
  lastSeen,
  status,
  readReceipt,
  groups,
}) => {
  return (
    <ul className="accordionContentList accordionPrivacyList">
      <li className="accordionContentItem accordionPrivacyItem">
        <h4>Profile photo</h4>
        <p>{profilePhoto}</p>
      </li>
      <li className="accordionContentItem accordionPrivacyItem">
        <h4>Last seen</h4>
        <p>{lastSeen}</p>
      </li>
      <li className="accordionContentItem accordionPrivacyItem">
        <h4>Status</h4>
        <p>{status}</p>
      </li>
      <li className="accordionContentItem accordionPrivacyItem">
        <h4>Read receipts</h4>
        <p>{readReceipt}</p>
      </li>
      <li className="accordionContentItem accordionPrivacyItem">
        <h4>Groups</h4>
        <p>{groups}</p>
      </li>
    </ul>
  );
};

export const SettingSecurity: FC<SettingSecurityProps> = ({
  securityNotification,
}) => {
  return (
    <div className="accordionContentItem accordionSecurityItem">
      <h4>Show security notifications</h4>
      <p>{securityNotification}</p>
    </div>
  );
};

export const SettingHelp: FC<SettingHelpProps> = ({}) => {
  return (
    <ul className="accordionContentList accordionHelpList">
      <li className="accordionContentItem accordionHelpItem">
        <h4>Name</h4>
      </li>
      <li className="accordionContentItem accordionHelpItem">
        <h4>Email</h4>
      </li>
      <li className="accordionContentItem accordionHelpItem">
        <h4>Location</h4>
      </li>
    </ul>
  );
};
