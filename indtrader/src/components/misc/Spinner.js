import React from 'react';

import {spinner_video} from './styles.js';




  export  class  Spinner  extends  React.Component {

    render()
    {
        return (
      <video autoPlay muted loop
      style={spinner_video} >
          <source src={require('./videos/loading.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        );
    }
  }