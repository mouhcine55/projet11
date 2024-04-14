//pour gérer les liens et la navigation dans l'application
import { Link, useNavigate } from "react-router-dom";
// pour interagir avec le store Redux et récupérer l'état global de l'application
import { useDispatch, useSelector } from "react-redux";
//pour effectuer des changements d'état liés à l'utilisateur
import { setLogin, setToken, setUser } from "../../store/actions/userActions";
import Logo from "../logo/Logo";

import "./Header.scss";
// useSelector pour extraire les informations de connexion de l'état global Redux. 
//isLogged est utilisé pour déterminer si l'utilisateur est connecté.
// userName pour afficher le nom d'utilisateur s'il est connecté

export default function Header() {
    const isLogged = useSelector((state) => state.user.isLogin);
    const userName = useSelector((state) => state.user.dataUser.userName);

    let logOption = null;

    const dispatch = useDispatch();
    const navigate = useNavigate();
// fonction logout qui sera appelée lors du clic sur le bouton de déconnexion.
// Cette fonction dispatch des actions Redux pour déconnecter l'utilisateur, puis navigue vers la page d'accueil ("/")
    const logout = () => {
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setUser(""));
        navigate("/");
    };
// Si l'utilisateur n'est pas connecté (isLogged === false), logOption est défini pour afficher le lien "Sign In"
    if (isLogged === false) {
        logOption = (
            <Link to="/login" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                Sign In
            </Link>
        );
    }
//Si l'utilisateur est connecté (isLogged === true), 
//logOption est défini pour afficher le lien vers la page de profil de l'utilisateur et un bouton de déconnexion
    if (isLogged === true) {
        logOption = (
            <div>
                <Link to="/userLogin" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    <span className="main-nav-name">{userName}</span>
                </Link>
                <Link to="/">
                    <button className="main-nav-item btn-logout" onClick={logout}>
                        <i className="fa fa-sign-out"></i>
                        Logout
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <header>
            <nav className="main-nav">
                <Logo />
                {logOption}
            </nav>
        </header>
    );
}
