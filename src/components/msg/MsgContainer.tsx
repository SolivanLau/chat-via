import MsgForm from './MsgForm';
import MsgHeader from './MsgHeader';

const MsgContainer = () => {
  return (
    <section className="sidebar msgContainer">
      <MsgHeader />
      <MsgForm />
    </section>
  );
};
export default MsgContainer;
