import { googleLogout } from '@react-oauth/google';
import type { AuthProps } from '../types';

function Logout({ handleAuthorization }: AuthProps) {
  const handleLogout = (): void => {
    googleLogout();
    handleAuthorization(false);
    console.log('Log out successfully!');
  };

  return (
    <div id="signOutButton">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
