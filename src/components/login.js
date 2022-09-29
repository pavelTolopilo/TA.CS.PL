import {GoogleLogin} from "react-google-login"

const clientId = "584328340810-8p8mqsu24g8oh78ameill3g66ucssbku.apps.googleusercontent.com";

const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
}

const onFailure = (res) =>
    console.log("LOGIN FAILED! res: ", res);


function Login({handleAuthorization}) {

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={(res) => {
                    handleAuthorization(true)
                    onSuccess(res)
                }}
                onFailure={(res) => {
                    handleAuthorization(false)
                    onFailure(res)
                }}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;
