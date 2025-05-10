import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "userName") setUserName(value);
        if (name === "password") setPassword(value);
        if (name === "cPassword") setCPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!userName || !email || !password || !cPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== cPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        alert("Password changed successfully");
    };

    return (
        <div className="reset-container">
            <form onSubmit={handleSubmit}>
                <table className="reset-table">
                    <tbody>
                        <tr>
                            <td colSpan={2} align="center">
                                <h2>Reset Password</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>Enter Username:</td>
                            <td>
                                <input
                                    type="text"
                                    name="userName"
                                    className="reset-input"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Enter Registered Email:</td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    className="reset-input"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Enter New Password:</td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    className="reset-input"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Confirm Password:</td>
                            <td>
                                <input
                                    type="password"
                                    name="cPassword"
                                    className="reset-input"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="reset-buttons">
                                    <button
                                        type="button"
                                        className="reset-button cancel"
                                        onClick={() => navigate('/signin')}
                                    >
                                        Back
                                    </button>
                                    <button type="submit" className="reset-button">
                                        Save
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {error && (
                            <tr>
                                <td colSpan={2} className="error-message">
                                    {error}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

