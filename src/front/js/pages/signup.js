import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (resp.ok) {
                alert("Conta criada com sucesso! Faz login.");
                navigate("/login");
            } else {
                const data = await resp.json();
                alert(data.msg || "Erro no registo");
            }
        } catch (error) {
            console.error("Erro no signup:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-50">
            <h2>Registo</h2>
            <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="signupEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="signupPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Criar Conta</button>
        </form>
    );
};
