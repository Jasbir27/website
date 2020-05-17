import React from 'react';
import {AuthPage} from '../components/authpage';
import PairCard from '../pages/home/PairCard';


// import {  Router, Route, Link, Switch } from 'react-router-dom'; 


import  firebase from 'firebase';
import { history } from '../helper';
import UserServices from '../services/userServices';

 export class LoginPage extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
          };
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {

            this.setState({
                loading: false
              });

            if(user)
          {
           
            history.push('/');
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

        return ( 
            
            <div style={{position:'absolute', top:'0', left:'0' , width:'100%',height:'100%'}} > 
                <div > This will be top line </div>
                <marquee><PairCard></PairCard> </marquee>
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',  marginLeft:'10px'}}>
                <div>this is some content on left side  </div> 
                <div>this is some content on left side  </div>
                <div style={{ maxWidth:'90vw', width:'400px'}}>  <AuthPage tabKey='1'></AuthPage> </div>
                </div>

            </div>

        );
    
{/* <div style={{position:'absolute', top:'0', left:'0' , width:'100%',height:'100%'}} > 
<div > This will be top line </div>
<marquee><PairCard></PairCard> </marquee>
<div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',  marginLeft:'10px'}}>
 <div>this is some content on left side  </div> 
 <div>this is some content on left side  </div>
<div style={{ maxWidth:'90vw', width:'400px'}}>  <AuthPage tabKey='1'></AuthPage> </div>
</div>

</div> */}

    }
}


