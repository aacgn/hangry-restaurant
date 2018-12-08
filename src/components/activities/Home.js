import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import HangryLogo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import OrderListView from '../OrderListView.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
    this.addOrderToCollapse = this.addOrderToCollapse.bind(this);
  }

  componentDidMount() {
    const restId = this.props.match.params.id || '5c08592af86b994f6fa2df0c';
    console.log(`Fetching restaurant ${restId}...`);
    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}`)
        .then((data) => {
            let orders = this.props.store.data.orders;
            this.props.setStore({
              ...this.props.store,
                data: {
                    orders,
                    restaurant: data.data
                }
            })
        })
    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}/getOrders`)
        .then((data) => {
            console.log(data);
            let restaurant = this.props.store.data.restaurant;
            this.props.setStore({
                data: {
                    orders: [...data.data],
                    restaurant
                }
            })
        })
  }

  addOrderToCollapse(orderId, alreadyCollapse) {
    if(!alreadyCollapse){
      let orders = this.state.orders;
      orders.push(orderId)
      this.setState({
        ...this.state,
        orders
      })
    }else {
      const index = this.state.orders.indexOf(orderId);
      let orders = this.state.orders;
      orders.splice(index,1);
      this.setState({
        ...this.state,
        orders
      })
    }
    console.log(this.state);
  }

  render() {
    return (
      <div className="activity home">
        <Header>
          <div className="activity__header">
            <HeaderItem>
            <img className="activity__header-logo" src={HangryLogo} />
            </HeaderItem>
            <HeaderItem>
              <div className="activity__header-restaurant-name">{'Olá, ' +(this.props.store.data.restaurant.name || "") + '.'}</div>
              <img className="activity__header-restaurant-image" src={this.props.store.data.restaurant.image_url} />
            </HeaderItem>
          </div>
        </Header>

        <div className="activity__section ">
          <h1 className="padded">pedidos</h1>
          <div className="home__order-list-view padded-x">
          {
            this.props.store.data.orders.map(order => {
              return <OrderListView key={order._id}
                                      id={order._id}
                                      from = {order.from_timestamp}
                                      to = {order.to_timestamp}
                                      total_price={order.total_price}
                                      multiplier={order.multiplier}
                                      status = {order.status}
                                      active={this.state.orders.includes(order._id)}
                                      addOrderToCollapse={(orderId, active) => this.addOrderToCollapse(orderId, active)}
                                      />
            })
          }
          </div>
        </div>
      </div>
    );
  }
}