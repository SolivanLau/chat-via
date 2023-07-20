import AuthForm from '../components/auth/AuthForm';
import { useState } from 'react';
import chatviaLogo from '../assets/logo-light.png';
const AuthPage = () => {
  // AUTH MODE: SIGN IN OR SIGN UP
  const [isSignin, setIsSignin] = useState(true);

  return (
    // MODAL CONTAINER
    <div className="modalContainer">
      {/* WRAPPER */}
      <div className="wrapper">
        {/* MODAL */}
        <article className="modal modalAuth">
          {/* AUTH HEADER */}
          <header className="modalAuthHeader">
            <img src={chatviaLogo} alt="Chatvia" />
            <h1> {isSignin ? `Sign In` : `Sign Up`}</h1>
            <p>
              {isSignin
                ? `Sign In to continue to Chatvia`
                : `Create an account to continue to Chatvia`}
            </p>
          </header>

          {/* AUTH FORM */}
          <AuthForm isSignIn={isSignin} />

          {/* AUTH SWITCH */}
          <div className="authSwitchContainer">
            <p>
              Don't have an account?
              <button
                className="authSwitchBtn"
                onClick={() => setIsSignin(!isSignin)}
              >
                {isSignin ? `SignUp now` : `SignIn now`}
              </button>
            </p>
          </div>

          {/* AUTH FOOTER */}
          <footer className="authModalFooter">
            <p>© Chatvia 2023</p>
          </footer>
        </article>
      </div>
    </div>
  );
};
export default AuthPage;
