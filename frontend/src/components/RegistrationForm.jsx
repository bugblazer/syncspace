function RegistrationForm({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    registerMessage,
    setRegisterMessage,
    isLoading,
    handleRegister,
    setIsLogin
}) {
    return (
        <>
            <h1>Create your SyncSpace account</h1>

            {registerMessage && <p>{registerMessage}</p>}

            <form onSubmit={handleRegister}>
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
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>

            <button onClick={() => {
                setRegisterMessage("");
                setIsLogin(true);
            }}>
                Already have an account? Login here
            </button>
        </>
    );
}

export default RegistrationForm;