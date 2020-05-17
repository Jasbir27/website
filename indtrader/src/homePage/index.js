import React from 'react';

import HeaderNav from '../components/home/HeaderNav';

import * as firebase from 'firebase';
import { history } from '../helper';

import {  Router, Route, Switch } from 'react-router-dom'; 
import Profile from '../components/home/profile';
import BankDetails from '../components/home/bankDetails';
import GameHistory from '../components/home/gameHistory';
import MatchMaker from '../components/home/matchMaker';

class HomePage extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
          };
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if(user)
          this.setState({
            loading: false
          });
          else
          {
           history.push('./login');
           
          }
         
        });
      }
      
      componentWillUnmount() {
        this.authSubscription();
      }

    render()
    {
        if(this.state.loading)
        return (<div> Loading ... </div>);
        return(
            <div >
               <HeaderNav></HeaderNav>
               
               <Router history={history}> 
                 <div style={{background:'red'}} style={{width:'100vw', height:'100vh'}}>
                 
                  <Switch> 
                    <Route   path='*/profile' component={Profile} >
                      </Route> 
                    <Route  path='*/bankdetails' component={BankDetails}>
                      </Route>  
                    <Route  path='*/gamehistory' component={GameHistory}>
                      </Route>
                      <Route  path='*/matchmaker' component={MatchMaker}>
                      </Route>   
                  </Switch> 
                </div> 
             </Router> 
                
                
                </div>
        );
    }
}

export default HomePage;