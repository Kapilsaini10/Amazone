// src/components/AuthLayout.jsx
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children }) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (!authStatus) {
            navigate("/login");
        }
    }, [authStatus, navigate]);

    return <>{children}</>;
}