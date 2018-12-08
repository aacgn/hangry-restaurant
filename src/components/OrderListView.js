import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);
        this.orderIcon = this.orderIcon.bind(this);
    }

    orderIcon() {
        switch(this.props.status) {
            case 'Pedido':
                return <FontAwesomeIcon icon={faCreditCard} />;
            case 'Em preperado':
                return <FontAwesomeIcon icon={faFistRaised} />;
            case 'Cancelado':
                return <FontAwesomeIcon icon={faBan} />;
            case 'Pronto':
                return <FontAwesomeIcon icon={faCheckCircle} />;
            default:
                return <FontAwesomeIcon icon={faQuestion} />;
        }
    }   

    render(){
        return ( 
            <div className="order-list">
                <div className="order-list__image">
                    {this.orderIcon()}
                </div>
                <div className="order-list__info">
                    <div className="order-list__name">
                        { this.props.name }
                    </div>
                    <div className="order-list__data">
                        { "R$" + ((this.props.total_price/100)*this.props.multiplier).toFixed(2) + " • " + this.props.from + "h às " + this.props.to + "h"}
                    </div>
                </div>
            
                <div className="order-list__angle">
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>  
            </div>
        );

    }
}
