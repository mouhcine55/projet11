import Button from "../button/Button";
import "./Transaction.scss";
// ce composant Transaction prend des propriétés spécifiques de ses enfants (title, amount, description)
// et les utilise pour afficher les détails de la transaction dans une structure HTML, en plus d'afficher un bouton "View transactions
export default function Transaction(children) {
    return (
        <section className="transaction">
            <div className="transaction-content-wrapper">
                <h3 className="transaction-title">{children.title}</h3>
                <p className="transaction-amount">{children.amount}</p>
                <p className="transaction-amount-description">{children.description}</p>
            </div>
            <Button>View transactions</Button>
        </section>
    );
}
