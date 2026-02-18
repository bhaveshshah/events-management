import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../../../components/Button/Button";
import { UserContext } from "../../../context/UserContext";
import { userLogin } from "../../../services/AuthService";

export const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSetPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lopin flex items-center justify-center min-h-screen">
      <div className="login-container w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className={loading ? "hidden" : "flex flex-col space-y-4"}>
          <h1 className="text-black">Login</h1>
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}
          <div className="login-demos flex gap-2">
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

          <div className="login-module flex flex-col">
            <div className="login-inputs flex flex-col text-black">
              <input
                className="w-full border-2 border-gray-300 p-2 mb-3 rounded-xl"
                type="email"
                value={email}
                placeholder="Enter you email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded-xl"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-transparent border-none p-0 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  onClick={handleSetPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="login-button flex flex-row-reverse gap-2 mt-8 ">
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleLogin}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
