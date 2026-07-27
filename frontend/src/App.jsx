import { useState } from "react";

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
  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      }
    );

    const data = await response.json();

    setMessage(data.message || data.error);
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword
          })
        }
      );

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
  async function getCurrentUser() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer: ${token}`
          }
        }
      );

      const data = response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    isLogin ? (
      <>
        <h1>Login to SyncSpace</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleLogin}>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input 
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading? "Loggin in..." : "Login"}
          </button>

        </form>

        <button onClick={() => setIsLogin(false)}>
          Don't have an account? Register here
        </button>

        <button onClick={getCurrentUser}>
          Get my profile
        </button>
      </>
    ) : (
      <>
        <h1>Create your SyncSpace account</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>

          <div>
            <label>Username</label>
            <input 
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
             />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading? "Registering" : "Register"}
          </button>

        </form>

        <button onClick={() => setIsLogin(true)}>
          Already have an account? Login here
        </button>
      </>
    )
  )

}

export default App;