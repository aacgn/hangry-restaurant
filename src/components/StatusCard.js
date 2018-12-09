import React from "react";
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

export default class StatusCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.addStatusSelected.bind(this);
    }

    addStatusSelected() {
        this.props.addStatusSelected(this.props.status, this.props.active);
    }

    orderIcon() {
        switch(this.props.status) {
            case 'Pedido':
                return <FontAwesomeIcon icon={faCreditCard} />;
            case 'Em preparo':
                return <FontAwesomeIcon icon={faSpinner} />;
            case 'Cancelado':
                return <FontAwesomeIcon icon={faBan} />;
            case 'Pronto':
                return <FontAwesomeIcon icon={faCheckCircle} />;
            case 'Entregue':
                return <FontAwesomeIcon icon={faShoppingBag} />;
            default:
                return <FontAwesomeIcon icon={faQuestion} />;
        }
    }

    render(){
        return (
            <div className="status-card__outer">
                <div className="status-card" active={this.props.active.toString()} 
                                               onClick={() => this.addStatusSelected()}>
                    <div className="icon">
                        {this.orderIcon()}
                    </div>
                    <div className="text">
                        {this.props.status}
                    </div>
                </div>
            </div>
        );
    }
}
