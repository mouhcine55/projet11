// Importation des dépendances
import "./EditName.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import { userEditProfile } from "../../store/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/actions/userActions";

export default function EditName({ setEdit }) {
    const [username, getUsernameChange] = useState("");

    const dispatch = useDispatch();
    //  Sélectionne le jeton d'authentification à partir du store Redux
    const token = useSelector((state) => state.user.token);
    // Sélectionne le nom d'utilisateur à partir du store Redux
    const userName = useSelector((state) => state.user.dataUser.userName);
    const firstName = useSelector((state) => state.user.dataUser.firstName);
    const lastName = useSelector((state) => state.user.dataUser.lastName);
 //   envoie une requête à l'API pour mettre à jour le nom d'utilisateur de l'utilisateur
    async function onSave(e) {
        e.preventDefault();
        try {
            const response = await userEditProfile(token, username);
            console.log(response);
            if (response.status === 200) {
                dispatch(setUser(response.body));
                setEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
//  annuler les modifications et arrêter le mode d'édition
    function cancel(e) {
        e.preventDefault();
        setEdit(false);
    }
// formulaire contenant des champs pour modifier le nom d'utilisateur, le prénom et le nom de famille de l'utilisateur. 
// Il y a également des boutons pour sauvegarder les modifications ou les annuler
    return (
        <form className="form-edit">
            <h2>Edit user info</h2>
            <div className="input-edit">
                <label htmlFor="username">User name :</label>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => getUsernameChange(e.target.value)}
                    required
                    placeholder={userName}
                />
            </div>
            <div className="input-edit">
                <label htmlFor="firstname">First name :</label>
                <input type="text" id="firstname" disabled placeholder={firstName} />
            </div>
            <div className="input-edit">
                <label htmlFor="lastname">Last name :</label>
                <input type="text" id="lastname" disabled placeholder={lastName} />
            </div>
            <div className="btn-edit">
                <button onClick={onSave}>Save</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </form>
    );
}
//  indique que la prop setEdit est requise et doit être une fonction
EditName.propTypes = {
    setEdit: PropTypes.func.isRequired,
};
