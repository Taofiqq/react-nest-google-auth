import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hooks/useStore";
import User from "./components/User";

function App() {
  const setAuthData = useStore((state) => state.setAuthData);
  return (
    <div className="App">
      {!useStore((state) => state.authData) ? (
        <>
          <h1>Welcome</h1>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              useOneTap={true}
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                const { data } = await axios.post(
                  "http://localhost:8080/login",
                  {
                    // pass the token as part of the req body
                    token: credentialResponse.credential,
                  }
                );
                localStorage.setItem("AuthData", JSON.stringify(data));
                setAuthData(data);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </>
      ) : (
        <>
          <h1>React x Nestjs Google Sign in</h1>
          <User />
        </>
      )}
    </div>
  );
}

export default App;
