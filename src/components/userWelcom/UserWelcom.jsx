import { useState } from "react";
import { useSelector } from "react-redux";
import EditName from "../editName/EditName";

import "./UserWelcom.scss";
// ce composant "UserWelcome" affiche un message de bienvenue à l'utilisateur avec son nom,
// il offre la possibilité de modifier ce nom en cliquant sur un bouton "Edit Name", ce qui affichera un composant de modification de nom.
export default function UserWelcom() {
    const [edit, setEdit] = useState(false);

    const userName = useSelector((state) => state.user.dataUser.userName);
// Si edit est true, le composant EditName est affiché, sinon, le message de bienvenue et le bouton "Edit Name" sont affichés.
    return (
        <div className="header">
            {edit ? (
                <EditName setEdit={setEdit} />
            ) : (
                <>
                    <h1>
                        Welcom back
                        <br />
                        {userName}!
                    </h1>
                    <button className="edit-button" onClick={() => setEdit(true)}>
                        Edit Name
                    </button>
                </>
            )}
        </div>
    );
}
