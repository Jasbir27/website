import React from 'react';

import {background_video } from  './styles.js';



  export  class  BackgroundVideo  extends  React.Component {

    render()
    {
        return (
    <video autoPlay muted loop
      style={background_video} >
          <source src={require('./videos/FlyingDollars.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        );
    }
  }