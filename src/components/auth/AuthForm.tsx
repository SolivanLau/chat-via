import { FormEvent, useState } from 'react';
import { useSignIn, useSignUp } from '../../firebase/authHooks';
import { useNavigate } from 'react-router-dom';
import AuthInput from './AuthInput';
import {
  RiErrorWarningLine,
  RiLock2Line,
  RiMailLine,
  RiContactsLine,
} from 'react-icons/ri';

// INTERFACE
interface AuthFormProps {
  isSignIn: boolean;
}

export interface userCredentials {
  email: string;
  password: string;
  userName: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignIn }) => {
  const navigate = useNavigate();
  // CONTROLLED INPUT STATE
  const [userCred, setUserCred] = useState<userCredentials>({
    email: '',
    password: '',
    userName: '',
  });

  // ERROR STATE
  const [isError, setError] = useState<{
    error: Boolean;
    message: null | string;
  }>({
    error: false,
    message: null,
  });

  // LOADING STATE
  const [loading, setisLoading] = useState(false);

  // HANDLE FORM SIGN UP/SIGN IN
  const handleSubmit = async (e: FormEvent) => {
    // prevent default
    e.preventDefault();

    // deconstruct user credentials
    const { email, password, userName } = userCred;

    // loading state ON
    setisLoading(true);

    // try request
    try {
      if (isSignIn) {
        await useSignIn(email, password);
      } else {
        await useSignUp(userName, email, password);
      }
      // ON SUCCESS
      setisLoading(false);
      setError({ error: false, message: null });
      console.log('signed in - redirecting');
      navigate('/');
    } catch (error: any) {
      // ON FAILURE
      setisLoading(false);
      const msg = error.message;
      setError({ error: true, message: msg });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="authForm">
        {/* email */}
        <AuthInput
          userCred={userCred}
          setUserCred={setUserCred}
          inputName="email"
          inputValue={userCred.email}
          labelIcon={<RiMailLine />}
        />
        {/* userName */}
        {!isSignIn && (
          <AuthInput
            userCred={userCred}
            setUserCred={setUserCred}
            inputName="userName"
            inputValue={userCred.userName}
            labelIcon={<RiContactsLine />}
          />
        )}
        {/* password */}
        <AuthInput
          userCred={userCred}
          setUserCred={setUserCred}
          inputName="password"
          inputValue={userCred.password}
          labelIcon={<RiLock2Line />}
          isPassword={true}
        />
        {/* button to submit */}
        <button type="submit" className="authBtn">
          Submit
        </button>
      </form>
      <div className="authErrorContainer">
        {isError.error && (
          <>
            <p>{isError.message}</p>
            <span className="authErrorIcon">
              <RiErrorWarningLine />
            </span>
          </>
        )}
      </div>
    </>
  );
};
export default AuthForm;
