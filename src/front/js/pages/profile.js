import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        // Se não há token, redireciona para login
        if (!store.token) {
            navigate("/login");
        } else {
            actions.getProfile();
        }
    }, [store.token]);

    return (
        <div className="text-center mt-5">
            <h1>Profile</h1>
            {store.user && (
                <>
                    <p>Email: {store.user.email}</p>
                    <p>ID: {store.user.id}</p>
                </>
            )}
        </div>
    );
};
