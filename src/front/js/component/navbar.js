import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <Link to="/" className="navbar-brand">Autenticação JWT</Link>
                <div className="ml-auto">
                    {store.token ? (
                        <>
                            <Link to="/profile" className="btn btn-outline-primary me-2">Profile</Link>
                            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
