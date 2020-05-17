import React from 'react';
import './App.css';



import {  Router, Route, Switch } from 'react-router-dom'; 
import { history } from './helper';


import {LoginPage}  from './loginPage';
import HomePage from './homePage';

import { connect } from 'react-redux';


 class App extends React.Component{

  constructor(props){
    super(props);
  }

  render()
  {
    return (

            <Router history={history}> 
                 <div className='App' style={{width:'100vw', height:'100vh'}}>
                 
                  <Switch> 
                  <Route  exact path='/' component={HomePage} >
                      </Route> 
                    
                    <Route exact path='/login' component={LoginPage}>
                      </Route>  
                      <Route  path='*' component={HomePage}>
                      </Route>  
                  </Switch> 
                </div> 
             </Router> 
      
        //     <div className='App' style={{width:'100vw', height:'100vh'}}>
            
        //   <LoginPage></LoginPage>
         
      
        // </div>
      );
  }
}

function mapState(state) {
  return {  };
}

const actionCreators = {
 
};

const connectedApp = connect(mapState, actionCreators)(App);
export  { connectedApp as App };
