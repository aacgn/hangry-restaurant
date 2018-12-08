import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import HangryLogo from '../../images/splash_logo.png';
import RestaurantImage from '../../images/flat-restaurant-with-lampposts_23-2147539585.jpg';
import HeaderItem from '../HeaderItem.js';
import OrderListView from '../OrderListView.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
                                      name={ order._id }
                                      from = {order.from_timestamp}
                                      to = {order.to_timestamp}
                                      total_price={order.total_price}
                                      multiplier={order.multiplier}
                                      status = {order.status}
                                      />
            })
          }
          </div>
        </div>
      </div>
    );
  }
}