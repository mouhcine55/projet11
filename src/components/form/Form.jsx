import { useState } from "react";
import { fetchLogin, userProfile } from "../../store/api";
import { useDispatch } from "react-redux";
import { setLogin, setToken, setUser } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";

import "./Form.scss";
// gère un formulaire de connexion
export default function Form() {
// Initialise l'état local email avec la valeur stockée dans le localStorage pour la clé "email", ou une chaîne vide si la clé n'existe pas
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
    const [errorLoginMessage, setErrorLoginMessage] = useState(false);
  // usedispatch permet de mettre a jour le store
    const dispatch = useDispatch();
    const navigate = useNavigate();
// appelée la fonction  lorsque le formulaire est soumis. 
//Elle effectue une requête de connexion en utilisant les informations d'email et de mot de passe fournies
//Si la réponse est un succès (statut 200), les actions Redux setLogin, setToken et setUser sont dispatchées pour mettre à jour l'état de l'utilisateur connecté dans le store Redux. Ensuite, l'utilisateur est redirigé vers la page "/userLogin".
//Si la réponse est un échec (statut 400), un message d'erreur est affiché et l'utilisateur est redirigé vers la page "/login"

async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetchLogin({
                email: email,
                password: password,
            });

            if (response.status === 200) {
                dispatch(setLogin(true));
                dispatch(setToken(response.body.token));
                const profile = await userProfile(response.body.token);
                const data = await profile.body;
                dispatch(setUser(data));
                navigate("/userLogin");
                console.log(data);
                console.log(response.body.token);

                if (rememberMe) {
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                    localStorage.setItem("rememberMe", "false");
                }
            }

            if (response.status === 400) {
                setErrorLoginMessage(true);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    let errorMessage = null;
    if (errorLoginMessage) {
        errorMessage = <p style={{ color: "red" }}>Error in Email or password! Please try again</p>;
    }
// Le composant retourne le formulaire JSX, avec des éléments d'entrée pour l'email et le mot de passe, ainsi qu'un bouton de soumission. 
// Le message d'erreur est affiché si nécessaire
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
                Sign in
            </button>
            {errorMessage}
        </form>
    );
}
