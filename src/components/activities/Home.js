import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import HangryLogo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import OrderListView from '../OrderListView.js';
import StatusCard from '../StatusCard.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders_collapsed: [],
      selected_status: "",
      status: [
        {id: 1, name: "Pedido"}, 
        {id: 2, name: "Em preparo"}, 
        {id: 3, name: "Pronto"}, 
        {id: 4, name: "Cancelado"}
      ]
    };
    this.addOrderToCollapse = this.addOrderToCollapse.bind(this);
    this.addStatusSelected = this.addStatusSelected.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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
      let orders = this.state.orders_collapsed;
      orders.push(orderId)
      this.setState({
        ...this.state,
        orders
      })
    }else {
      const index = this.state.orders_collapsed.indexOf(orderId);
      let orders = this.state.orders_collapsed;
      orders.splice(index,1);
      this.setState({
        ...this.state,
        orders
      })
    }
    console.log(this.state);
  }

  addStatusSelected(status, alreadySelected) {
    const restId = this.props.match.params.id || '5c08592af86b994f6fa2df0c';
    if(!alreadySelected){
      axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}/getOrdersByStatus/${status}`)
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
      this.setState({
        ...this.state,
        selected_status: status
      })
    }else {
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
      this.setState({
        ...this.state,
        selected_status: ""
      })
    }
  }

  requestOrdersByStatus(status){
    const restId = this.props.match.params.id || '5c08592af86b994f6fa2df0c';
    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}/getOrdersByStatus/${status}`)
    .then((data) => {
        let restaurant = this.props.store.data.restaurant;
        this.props.setStore({
            data: {
                orders: [...data.data],
                restaurant
            }
        })
    })
  }

  changeStatus(orderId, status){
    let req = {
        url: `https://hangry-api.herokuapp.com/order/${orderId}`,
        method: 'PUT',
        data: {
            status
        }
    }
    axios(req).then(response => {
      const index = this.state.orders_collapsed.indexOf(orderId);
      let orders = this.state.orders_collapsed;
      orders.splice(index,1);
      this.setState({
        ...this.state,
        orders
      })
      let selected_status = this.state.selected_status;
      if(selected_status){
        this.requestOrdersByStatus(selected_status);
      } else {
        this.componentDidMount();
      }
      this.forceUpdate();
    });
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
          <div className="activity__section">
            <h1 className="margged-y padded">filtro</h1>
            <div className="home__checkout">
                {
                  this.state.status.map(status => <StatusCard key = {status.id}
                                                            status = {status.name}
                                                            active={this.state.selected_status === status.name}
                                                            addStatusSelected={(status, active) => this.addStatusSelected(status, active)}/>) 
                }
                </div>
              </div>

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
                                        active={this.state.orders_collapsed.includes(order._id)}
                                        addOrderToCollapse={(orderId, active) => this.addOrderToCollapse(orderId, active)}
                                        changeStatus={(orderId, status) => this.changeStatus(orderId, status)}
                                        />
              })
            }
            </div>
          </div>
        </div>
    );
  }
}