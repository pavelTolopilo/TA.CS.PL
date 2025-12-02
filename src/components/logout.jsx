import { googleLogout } from '@react-oauth/google';

function Logout({ handleAuthorization }) {
  const handleLogout = () => {
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
