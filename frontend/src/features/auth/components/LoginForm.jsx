import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/Button/Button";
import { UserContext } from "../../../context/UserContext";
import { userLogin } from "../../../services/AuthService";


const LoginPage = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [email, setEmail] = useState("testing@gmail.com");
    const [password, setPassword] = useState("wikqum-wymhoj-5dYzn");

    const [showPassword, setShowPassword] = useState(true);

    const demoCreds = [
        { label: "Demo 1", email: "demo1@example.com", password: "demo-pass-111" },
        { label: "Demo 2", email: "demo2@example.com", password: "demo-pass-222" },
        { label: "Demo 3", email: "demo3@example.com", password: "demo-pass-333" },
    ];

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            const loggedInUser = await userLogin(email, password);
            setUser(loggedInUser);
            navigate("/profile");
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Login failed. Please try again.");
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className={loading ? "hidden" : "flex flex-col space-y-4"}>
            <h1>Login Page</h1>
            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    <span className="mr-2">⚠️</span>
                    {error}
                </div>
            )}
            <div className="flex gap-2">
                {demoCreds.map((cred) => (
                    <Button
                        key={cred.label}
                        onClick={() => {
                            setEmail(cred.email);
                            setPassword(cred.password);
                        }}
                    >
                        {cred.label}
                    </Button>
                ))}
            </div>
            <input
                className="border-2 border-gray-300 p-2 rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <span className="flex items-center gap-x-5 space-x-2">
                <input
                    className="border-2 border-gray-300 p-2 rounded"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    Show Password
                </label>
            </span>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    )
}

export default LoginPage;