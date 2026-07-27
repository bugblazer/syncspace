import { useState } from "react";
import RegistrationForm from "./components/registrationForm";
import LoginForm from "./components/LoginForm";
import { register } from "./services/authService";
import { login } from "./services/authService";
import { getCurrentUser } from "./services/authService";

function App() {
  //Registration page states
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Loading states
  const [isLoading, setIsLoading] = useState(false);

  //Login page states
  const [isLogin, setIsLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Registration handler
  async function handleRegister(event) {
    event.preventDefault();

    setMessage("");
    setIsLoading(true);

    try {
    const response = await register(username, email, password);

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error);
    }
    } catch (error){
      setMessage("Something went wrong. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  //Login handler
  async function handleLogin(event) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    try {
      const response = await login(loginEmail, loginPassword);

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful");
      } else {
        setMessage(data.message || data.error);
      }

    } catch (error) {
      setMessage("Something went wrong. Please try again.");
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
      loginEmail={loginEmail}
      setLoginEmail={setLoginEmail}
      loginPassword={loginPassword}
      setLoginPassword={setLoginPassword}
      message={message}
      isLoading={isLoading}
      handleLogin={handleLogin}
      getProfile={getProfile}
      setIsLogin={setIsLogin}
    />
    :
    <RegistrationForm
      username = {username}
      setUsername = {setUsername}
      email = {email}
      setEmail = {setEmail}
      password = {password}
      setPassword = {setPassword}
      message = {message}
      isLoading = {isLoading}
      handleRegister = {handleRegister}
      setIsLogin = {setIsLogin}
    />
  );

}

export default App;