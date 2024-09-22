import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAuth, applyActionCode } from 'firebase/auth';
import logo from "../images/logo.png"
import "./ResetPassword.css";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('Verifying...');
    const auth = getAuth();

    useEffect(() => {
        const code = searchParams.get('oobCode'); // Get the verification code from URL
        if (code) {
            applyActionCode(auth, code)
                .then(() => setStatus('Email verified successfully!'))
                .catch((error) => setStatus('Failed to verify email. ' + error.message));
        } else {
            setStatus('Invalid or missing verification code.');
        }
    }, [auth, searchParams]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
            <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
                <div className="card-body">
                    <div className='logo-container'>
                        <img src={logo} alt="logo" className='logo-img' />
                        <h3 className='logo-txt'>Sathya Sai Grama</h3>
                    </div>
                    {status && <p className="text-success text-center mt-4">{status}</p>}
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
