import React from 'react';

export default class PlayerCard extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="container bootstrap snippet" style={{width:'320px', marginTop:'10px', height:'60px', background:'transparent', padding:'0px'}}>
               <div className="row justify-content-center border border-secondary" style={{borderRadius:'0%',alignItems:'center', height:'100%',background:'#C0C0C0'}}>
                <div style={{background:'transparent' , width:'20%', height:'100%', fontSize:'40px'}}>
                <strong>{this.props.playerNumber}</strong>
                </div>
                <div className="container" style={{background:'yellow' , padding:'0px', width:'30%', height:'100%'}}>
                    <img style={{padding:'0px', width:'100%', height:'100%'}} src={this.props.imgSrc}></img>
                </div>
                <div style={{background:'transparent' , width:'50%', height:'100%', fontSize:'22px', paddingTop:'3%'}}>
                    <strong>{this.props.playerName}</strong> </div>
                </div>
            </div>
        );
    }

}