import { FC, ReactElement } from 'react';

interface MsgBtnProps {
  icon: ReactElement;
  isSubmit: boolean;
  popup?: string | ReactElement;
  isPopupBelow?: boolean;
  additionalClass?: string;
  trigger?: () => void;
}

const MsgBtn: FC<MsgBtnProps> = ({
  icon,
  popup,
  isPopupBelow,
  additionalClass,
  isSubmit,
  trigger,
}) => {
  return (
    <button
      className={additionalClass ? `msgBtn ${additionalClass}` : 'msgBtn'}
      type={isSubmit ? `submit` : 'button'}
      onClick={trigger}
    >
      <div className="msgIconContainer">{icon}</div>
      {popup && (
        <span className={isPopupBelow ? ' msgPopupBelow' : 'msgIconPopup'}>
          {popup}
        </span>
      )}
    </button>
  );
};
export default MsgBtn;
