const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null,
			user: null
		},
		actions: {
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (!resp.ok) {
						alert("Credenciais inválidas");
						return false;
					}

					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, user: data.user });

					return true;
				} catch (error) {
					console.error("Erro no login:", error);
					return false;
				}
			},

			getProfile: async () => {
				const store = getStore();

				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/profile", {
						method: "GET",
						headers: {
							Authorization: "Bearer " + store.token
						}
					});

					if (!resp.ok) {
						console.warn("Token inválido ou expirado");
						return;
					}

					const data = await resp.json();
					setStore({ user: data.user });
				} catch (error) {
					console.error("Erro ao obter perfil:", error);
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null, user: null });
			},

			getMessage: async () => {
				// Exemplo de fetch (mantido do boilerplate original)
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					console.log(data.message);
					return data.message;
				} catch (error) {
					console.error("Erro ao obter mensagem do backend:", error);
				}
			}
		}
	};
};

export default getState;
