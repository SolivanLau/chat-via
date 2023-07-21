import { FC, ChangeEvent, useState } from 'react';
import { userCredentials } from './AuthForm';
import { ReactElement } from 'react';
interface authInputProps {
  inputValue: string;
  inputName: string;
  userCred: object;
  setUserCred: (newState: userCredentials) => void;
  labelIcon: ReactElement;
  isPassword?: boolean;
}

const AuthInput: FC<authInputProps> = ({
  inputValue,
  inputName,
  labelIcon,
  isPassword,
  // useState
  userCred,
  setUserCred,
}) => {
  // control inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newCred: any = {
      ...userCred,
      [name]: value,
    };
    setUserCred(newCred);
  };

  const createLabel = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const [inputPassword, setInputPassword] = useState(false);

  return (
    <div className="authInputContainer">
      {/* TEXT LABEL */}
      <label htmlFor={inputName} className="authInputLabel">
        {createLabel(inputName)}
      </label>

      {/* INPUT */}
      <div className="authInput">
        {/*  ICON LABEL */}
        {isPassword ? (
          <button
            className="authInputIcon authInputIconPassword"
            type="button"
            onClick={() => setInputPassword(!inputPassword)}
          >
            {labelIcon}
          </button>
        ) : (
          <label className="authInputIcon" htmlFor={inputName}>
            {labelIcon}
          </label>
        )}

        <input
          type={inputPassword ? `password` : 'text'}
          name={inputName}
          id={inputName}
          value={inputValue}
          className="input"
          placeholder={`Enter ${inputName}`}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
  );
};
export default AuthInput;
