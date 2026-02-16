import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/Button/Button";
import { UserContext } from "../../../context/UserContext";
import { userCreate } from "../../../services/AuthService";

const RegisterPage = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const demoCreds = [
        { label: "Demo 1", email: "demo1@example.com", password: "demo-pass-111" },
        { label: "Demo 2", email: "demo2@example.com", password: "demo-pass-222" },
        { label: "Demo 3", email: "demo3@example.com", password: "demo-pass-333" },
    ];

    const handleCreateUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const newUser = await userCreate(email, password)
            // setUser(newUser);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={loading ? "hidden" : "flex flex-col space-y-4"}>
            <h1>Register Page</h1>
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
            <Button onClick={handleCreateUser}>Create</Button>
        </div>
    );
}

export default RegisterPage;