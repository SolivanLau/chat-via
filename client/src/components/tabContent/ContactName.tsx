import { FC } from 'react';
import { useAppSelector } from '../../state/stateHooks';
import { useCreateChat } from '../../firebase/dbHooks';

interface ContactNameProps {
  key: string;
  id: string;
  name: string;
}
const ContactName: FC<ContactNameProps> = ({ name, id }) => {
  const { uid } = useAppSelector((state) => state.auth);
  const contactId = id;
  const handleMsgContact = () => {
    useCreateChat(contactId, uid);
  };
  return (
    <li className="contactNameContainer">
      <button onClick={handleMsgContact}>
        <h5 className="contactName">{name}</h5>
      </button>
    </li>
  );
};
export default ContactName;
