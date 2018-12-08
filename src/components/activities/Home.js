import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Logo from '../../images/splash_logo.png';
import User from '../../images/1.jpg';
import HeaderItem from '../HeaderItem.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    axios.get('https://hangry-api.herokuapp.com/restaurant/5c08592af86b994f6fa2df0c')
         .then((data) => {
            console.log(data);
            this.props.setStore({
              data: {
                restaurant: data.data
              }
            })
    });
  }

  render() {
    return (
      <div className="activity home">
        <Header>
          <div className="activity__header">
            <HeaderItem>
            <img className="activity__header-logo" src={Logo} />
            </HeaderItem>
            <HeaderItem>
              <div className="activity__header-user-name">{"Hangryrestaurant"}</div>
              <img className="activity__header-user-image" src={User} />
            </HeaderItem>
          </div>
        </Header>
      </div>
    );
  }
}