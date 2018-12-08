import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import MealListView from './MealListView.js';

export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.orderIcon = this.orderIcon.bind(this);
        this.color = this.color.bind(this);
    }

    componentDidMount() {
        axios.get(`https://hangry-api.herokuapp.com/order/${this.props.id}/getAllMealsFromOrder`)
        .then(data => {
            console.log(data);
            this.setState(prevState => ({
                meals: data.data
            }));
        }).catch(err => {
            console.log(err);
        });
  }

    handleClick() {
        this.props.addOrderToCollapse(this.props.id, this.props.active);
        console.log("click1")
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
    
    color() {
        if (this.props.multiplier >= 1.15) {
            return '#ff5500';
        }
        else if (this.props.multiplier >= 1.1){
            return '#FF9800';
        }
        else if (this.props.multiplier >= 0.95){
            return '#4caf50';            
        } else{
            return '#7faf4c';
        }
    }

    render(){
        return (
            this.state.meals.length > 0?
            <div className="order-list" style={{
                borderBottomColor: this.color(),
                borderBottomWidth: 3
                }} onClick={() => this.handleClick()}>
                <div className="order-list__header">
                    <div className="order-list__image">
                        {this.orderIcon()}
                    </div>
                    <div className="order-list__details">
                        <div className="order-list__name">
                                { (this.props.id).substr(0,6) }
                        </div>
                        {
                                this.props.multiplier < 1?
                                <div className="order-list__percentage-ratio">{(100-(this.props.multiplier * 100).toFixed(0)) + '% DE DESCONTO'}</div>
                                : 
                                this.props.multiplier > 1?
                                <div className="order-list__percentage-ratio">{((this.props.multiplier * 100).toFixed(0) - 100) + '% DE AUMENTO'}</div>
                                :
                                <div></div>
                        }
                        <div className="order-list__info">
                            <div className="order-list__price">
                                {"R$" + ((this.props.total_price/100)*this.props.multiplier).toFixed(2)}
                            </div>
                            <div className="order-list__data">
                                {"- " + this.props.from + "h às " + this.props.to + "h"}
                            </div>
                        </div>
                    </div>
                    <div className="order-list__angle">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>  
                </div>
                <div className="order-list__content" active={this.props.active.toString()}>
                    {
                        this.state.meals.map(meal => {
                            return <MealListView key={meal._id}
                                                id={meal._id}
                                                name={meal.name} 
                                                description={meal.description} 
                                                price={meal.price} 
                                                url={meal.image_url}
                                                />
                        })
                    }
                </div>
                </div>:<div><h2>Nenhum pedido encontrado.</h2></div>
        );

    }
}
