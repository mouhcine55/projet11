import Transaction from "../../components/transaction/Transaction";
import UserWelcom from "../../components/userWelcom/UserWelcom";
import { transaction } from "../../constants/constants";

import "./UserLogin.scss";
//ce composant "UserLogin" rend un message de bienvenue personnalisé et affiche toutes les transactions associées à l'utilisateur connecté sur la page de connexion.
// Les données des transactions sont extraites du fichier de constantes pour afficher dynamiquement les transactions sur la page.
export default function UserLogin() {
    return (
        <main className="bg-dark">
            <UserWelcom />
            <h2 className="sr-only">Accounts</h2>
            {transaction.map((transaction, index) => (
                <Transaction
                    key={index}
                    title={transaction.title}
                    amount={transaction.amount}
                    description={transaction.description}
                />
            ))}
        </main>
    );
}
