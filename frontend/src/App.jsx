import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import { register } from "./services/authService";
import { login } from "./services/authService";
import { getCurrentUser } from "./services/authService";

function App() {
  //Registration page states
  const [registerMessage, setRegisterMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Loading states
  const [isLoading, setIsLoading] = useState(false);

  //Login page states
  const [loginMessage, setLoginMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Registration handler
  async function handleRegister(event) {
    event.preventDefault();

    setRegisterMessage("");
    setIsLoading(true);

    try {
    const response = await register(username, email, password);

    const data = await response.json();

    if (response.ok) {
      setRegisterMessage(data.message);
    } else {
      setRegisterMessage(data.error);
    }
    } catch (error){
      setRegisterMessage("Something went wrong. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  //Login handler
  async function handleLogin(event) {
    event.preventDefault();

    setIsLoading(true);
    setLoginMessage("");

    try {
      const response = await login(loginEmail, loginPassword);

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setLoginMessage("Login successful");
      } else {
        setLoginMessage(data.message || data.error);
      }

    } catch (error) {
      setLoginMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  //Get the logged in user
  async function getProfile() {
    try {
      const response = await getCurrentUser();

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    isLogin ?
    <LoginForm
      loginEmail = {loginEmail}
      setLoginEmail = {setLoginEmail}
      loginPassword = {loginPassword}
      setLoginPassword = {setLoginPassword}
      loginMessage = {loginMessage}
      setLoginMessage = {setLoginMessage}
      isLoading = {isLoading}
      handleLogin = {handleLogin}
      getProfile = {getProfile}
      setIsLogin = {setIsLogin}
    />
    :
    <RegistrationForm
      username = {username}
      setUsername = {setUsername}
      email = {email}
      setEmail = {setEmail}
      password = {password}
      setPassword = {setPassword}
      registerMessage = {registerMessage}
      setRegisterMessage = {setRegisterMessage}
      isLoading = {isLoading}
      handleRegister = {handleRegister}
      setIsLogin = {setIsLogin}
    />
  );

}

export default App;