import React from 'react';

// import {Tabs,Card,ListGroup,Container,Row,Col,Badge,Button} from 'react-bootstrap';

import logo from '../../assets/images/EURCAD.svg';

console.log(' here is pic ');
console.log(logo);
const card_main = {
    display: 'flex',
    minWidth:'250px',
    marginRigh:'10px',
    maxWidth:'500px',
    minHeight:'25px',
    maxHeight:'30px',
    background: 'white',
    fontSize:28,
    padding:'0px',
    flexWrap:'nowrap'
  }

const arrowUp={
	width: 0,
    height: 0,
    marginTop:'5px',
	borderLeft: '10px solid transparent',
	borderRight: '10px solid transparent',
    borderBottom: '20px solid green'
}

const arrowDown={
    
	width: 0,
    height: 0,
    marginTop:'7px',
	borderLeft: '10px solid transparent',
	borderRight: '10px solid transparent',
    borderTop: '20px solid red'

}

export  default  class  PairCard  extends  React.Component {

    constructor (props) {
        super(props);
  
        this.state = {
            imgSource: this.props.imgSource
        }
        // this.onPressTab = this.onPressTab.bind(this)
      }

    render()
    {
        return <div style={card_main}>
                 
            <img src={logo} alt="Logo"  style={{marginTop:'1px',background:'transparent', width: '50px', padding:'0px', alignItem: 'left'}}/> 
            <div style={{display:'flex', background:'transparent' , fontWeight:'bold', padding : '0px 5px 10px 10px',  fontSize:22,  flexWrap:'nowrap'}}>EUR / USD</div>
            <div style={arrowDown}>  </div>
            <div style={{display:'flex', background:'transparent' , padding : '2px 5px 10px 10px',  fontSize:18}}>0.924564 / 0.9834535 </div>
        

         </div>;

    }
}