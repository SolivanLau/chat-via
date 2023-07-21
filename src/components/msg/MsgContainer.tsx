import ChatContainer from './ChatContainer';
import MsgForm from './MsgForm';
import MsgHeader from './MsgHeader';

const MsgContainer = () => {
  return (
    <section className="sidebar msgContainer">
      {/* HEADER */}
      <MsgHeader />
      {/* CHAT LOG */}
      <ChatContainer />
      {/* USER INPUT FORM */}
      <MsgForm />
    </section>
  );
};
export default MsgContainer;
