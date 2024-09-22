import React, { useState } from 'react';
import { auth } from '../firebase';
import { confirmPasswordReset } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png"
import "./ResetPassword.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const [error, setError] = useState("");
    const oobCode = searchParams.get('oobCode');

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Toggle the password visibility
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Custom validation function
    const validatePassword = (password) => {
        if (password.length < 8 || password.length > 20) {
            return "Password must be between 8 and 20 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least 1 capital letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least 1 lowercase letter.";
        }
        if (!/\d/.test(password)) {
            return "Password must contain at least 1 digit.";
        }
        if (!/[@$!%*?&]/.test(password)) {
            return "Password must contain at least 1 special character (e.g., @$!%*?&).";
        }
        return "";
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Validate password strength
        const validationError = validatePassword(confirmPassword);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(""); // Clear error if validation passes

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage('Password reset successful.');
        } catch (error) {
            setMessage('Error resetting password: ' + error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
            <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
                <div className="card-body">
                    <div className='logo-container'>
                        <img src={logo} alt="logo" className='logo-img'/>
                        <h3 className='logo-txt'>Sathya Sai Grama</h3>
                    </div>
                    <h5 className="card-title text-center mb-4 mt-4">Reset Password</h5>
                    <p className="text-center text-muted">
                        <p style={{ fontSize: "12px" }}>Password must be at least 8 characters long, contains both upper and lower case letters, includes at least one number, and has at least one special character <span style={{ color: "red" }}>(e.g., !@#$%^&*)</span>.</p>
                    </p>
                    <form onSubmit={handlePasswordReset}>
                        <div className="form-group mb-3" style={styles.passwordContainer}>
                            <label htmlFor="new password">New Password</label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="form-control"
                                id="new password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <span onClick={toggleNewPasswordVisibility} style={styles.eyeIcon}>
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="form-group mb-3" style={styles.passwordContainer}>
                            <label htmlFor="confirm password">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                id="confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span onClick={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <div className="form-group mb-3 text-center">
                            <button type="submit" className="btn w-100" style={{backgroundColor: "#B21E2B", color: "white", height: "40px"}}>
                                Reset Password
                            </button>
                        </div>
                    </form>
                    {message && <p className="text-success text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
};

const styles = {
    passwordContainer: {
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: "8px",
        top: "65%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        color: "#999",
    },
};

export default ResetPassword;
