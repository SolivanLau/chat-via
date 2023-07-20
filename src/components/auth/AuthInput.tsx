import { FC, ChangeEvent } from 'react';
import { userCredentials } from './AuthForm';
interface authInputProps {
  inputValue: string;
  inputName: string;
  userCred: object;
  setUserCred: (newState: userCredentials) => void;
  labelIcon?: string;
}

const AuthInput: FC<authInputProps> = ({
  inputValue,
  inputName,
  labelIcon,
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

  return (
    <div className="authInputContainer">
      <label htmlFor={inputName}>{createLabel(inputName)}</label>
      <div className="authInput">
        {labelIcon && (
          <label htmlFor={inputName}>
            <img src={labelIcon} alt="test" />
          </label>
        )}

        <input
          type="text"
          name={inputName}
          id={inputName}
          value={inputValue}
          className="input"
          placeholder={`Enter ${createLabel(inputName)}`}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
  );
};
export default AuthInput;
