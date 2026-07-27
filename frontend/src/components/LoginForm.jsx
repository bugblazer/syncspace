function LoginForm({
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    message,
    isLoading,
    handleLogin,
    getProfile,
    setIsLogin
}) {
    return (
        <>
            <h1>Login to SyncSpace</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={loginEmail}
                        onChange={(event) =>
                            setLoginEmail(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(event) =>
                            setLoginPassword(event.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            <button onClick={getProfile}>
                Get My Profile
            </button>

            <button onClick={() => setIsLogin(false)}>
                Don't have an account? Register
            </button>
        </>
    );
}

export default LoginForm;