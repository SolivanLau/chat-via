import { FormEvent, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useSignIn, useSignUp } from '../../firebase/authHooks';
import AuthInput from './AuthInput';
import { redirect, useNavigate } from 'react-router-dom';

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

  // handle form sign in OR signUp
  const handleSubmit = async (e: FormEvent) => {
    // prevent default
    e.preventDefault();

    // deconstruct user credentials
    const { email, password, userName } = userCred;

    setisLoading(true);

    try {
      if (isSignIn) {
        await useSignIn(email, password);
      } else {
        await useSignUp(userName, email, password);
      }
      setisLoading(false);
      setError({ error: false, message: null });
      console.log('signed in - redirecting');
      navigate('/');
    } catch (error: any) {
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
        />
        {/* userName */}
        {!isSignIn && (
          <AuthInput
            userCred={userCred}
            setUserCred={setUserCred}
            inputName="userName"
            inputValue={userCred.userName}
          />
        )}
        {/* password */}
        <AuthInput
          userCred={userCred}
          setUserCred={setUserCred}
          inputName="password"
          inputValue={userCred.password}
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
