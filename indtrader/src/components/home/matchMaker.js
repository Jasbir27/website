import React, { Component } from 'react';
import {webSocketConst} from '../../constants';
import PlaterCard from './playerCard';
import firebase from 'firebase';


export default class MatchMaker extends Component {
    constructor(props)
    {
        super(props);
        this.state={currentTask:'loadingMatch',noOfPlayers:0,gameStared:false};
        this.players=[]
        this.gameId=''

    }
  componentDidMount() {
      let token=firebase.auth().currentUser.getIdToken(true).then((idToken)=>{
        //   console.log('token is###'+idToken+'###');
        const client  = new WebSocket(webSocketConst.basePath+'/matchmaker2?token='+idToken);
        client.onopen = () => {
      console.log('WebSocket Client Connected');
       
      this.setState({currentTask:'findingPlayers'});
    //   client.send("hi i am react app");

    };
    client.onmessage = (evt) => {
      console.log(evt.data);
      let msg=JSON.parse(evt.data);
      
      if(msg.msgType==='addPlayer')
      {
          console.log(' server saying to add '+msg.userID);
          let player = {playerName:msg.userName, dpDownloadURL:msg.dpDownloadURL};
          this.players.push(player);
          let {noOfPlayers}=this.state;
          noOfPlayers=noOfPlayers+1;
          this.gameId=msg.gameId;
          this.setState({noOfPlayers:noOfPlayers});
      }
      if(msg.msgType==='query_userDetails'){
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        console.log("currently : "+JSON.stringify(userDetails));
        if(userDetails.dpDownloadURL)
        {
        let data={msgType:'userDetails',userName:userDetails.displayName,dpDownloadURL:userDetails.dpDownloadURL};
        client.send(JSON.stringify(data));
        console.log('sent :'+JSON.stringify(data));
        }
        else
        {
            var userDetails = JSON.parse(localStorage.getItem('userDetails'));
 
            var pathReference = firebase.storage().ref('profilePhotos/'+userDetails.photoURL);
            pathReference.getDownloadURL().then(url => {
            console.log('url '+url);
            userDetails['dpDownloadURL']=url;
            localStorage.setItem('userDetails',JSON.stringify(userDetails));
            
            let data={msgType:'userDetails',userName:userDetails.displayName,dpDownloadURL:userDetails.dpDownloadURL};
            client.send(JSON.stringify(data));
            console.log('sent :'+JSON.stringify(data));

        });
        }
        
      }

      if(msg.msgType==='gameStarted'){
          this.setState({gameStarted:true});
      }
      
    };
      });

  }

renderPlayers()
{
    let {noOfPlayers}=this.state;
    const items=[]
    console.log('noOfPlayers '+noOfPlayers);
    for(var i=0;i<noOfPlayers;i++)
    {
        
        let p=this.players[i];
        console.log('player:'+JSON.stringify(p));
        items.push(<PlaterCard playerNumber={i+1} playerName={p['playerName']} imgSrc={p['dpDownloadURL']}></PlaterCard>);
    }

    return items;
}
  renderTaskBar()
  {
        let {currentTask}=this.state;
        
        if(currentTask==='loadingMatch')
        {
            return (
            <h1 style={{marginTop:'20px'}}>Loading Match ...</h1>);
        }

        if(currentTask==='findingPlayers')
        {
            return (
                <div>
            <h1 style={{marginTop:'20px', marginBottom:'20px'}}>Game ID: {this.gameId}</h1>
            <h1 style={{marginTop:'20px', marginBottom:'20px'}}>Finding players ...</h1>
            </div>);
        }

  }
  
  render() {
      let {gameStarted}=this.state;
      if(gameStarted)
      {
        return (
            <div style={{paddingTop:'10px'}}>
              Game Started : {this.gameId}
              
            </div>
        );
      }
      else
      {
        return (
            <div style={{paddingTop:'10px'}}>
              {this.renderTaskBar()}
              {this.renderPlayers()}
              {/* <PlaterCard playerNumber='1' playerName="Jasbir Singh" imgSrc="https://www.w3schools.com/images/picture.jpg"></PlaterCard>
              <PlaterCard playerNumber='2' playerName="Jasbir Singh" imgSrc="https://www.w3schools.com/images/picture.jpg"></PlaterCard>
              <PlaterCard playerNumber='3' playerName="Jasbir Singh" imgSrc="https://www.w3schools.com/images/picture.jpg"></PlaterCard>
              <PlaterCard playerNumber='4' playerName="Jasbir Singh" imgSrc="https://www.w3schools.com/images/picture.jpg"></PlaterCard>
           */}
            </div>
          );
      }
    
  }
}
