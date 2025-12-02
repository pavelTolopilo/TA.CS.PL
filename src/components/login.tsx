import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import type { AuthProps, GoogleCredentialResponse, DecodedToken } from '../types';

function Login({ handleAuthorization }: AuthProps) {
  const onSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('LOGIN SUCCESS! Current user: ', decoded);
      handleAuthorization(true);
    } catch (error) {
      console.log('LOGIN FAILED! error: ', error);
      handleAuthorization(false);
    }
  };

  const onError = () => {
    console.log('LOGIN FAILED!');
    handleAuthorization(false);
  };

  return (
    <div id="signInButton">
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </div>
  );
}

export default Login;
