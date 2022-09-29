import { GoogleLogout} from "react-google-login"

const clientId = "584328340810-8p8mqsu24g8oh78ameill3g66ucssbku.apps.googleusercontent.com";

function Logout({handleAuthorization}) {
    const onSuccess = () => console.log("Log out successfully!");

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={(res) => {
                    handleAuthorization(false)
                    onSuccess(res)
                }}
            />
        </div>
    )
}

export default Logout;
