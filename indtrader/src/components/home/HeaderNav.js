import React from 'react';
import * as firebase from 'firebase';
import { history } from '../../helper';

 class HeaderNav extends React.Component{

    constructor(props)
    {
        super(props);
        
        this.logout = this.logout.bind(this);
        this.getEmailOrName = this.getEmailOrName.bind(this);
        this.state={
            photoUrl:null
        }

        
        
        // var pathReference = firebase.storage().ref('profilePhotos/defaultPhoto.jpg');



    }

    componentWillMount(prevProps, prevState, snapshot) {

        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
 
        var pathReference = firebase.storage().ref('profilePhotos/'+userDetails.photoURL);
        pathReference.getDownloadURL().then(url => {
            console.log('url '+url);
            userDetails['dpDownloadURL']=url;
            localStorage.setItem('userDetails',JSON.stringify(userDetails));
            this.setState({photoUrl:url});
        });

      }
    


    getName()
    {
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        return userDetails['displayName'] ;
    }
    getEmailOrName()
    {
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        return userDetails['email'] ;
    }
    getPhotoUrl()
    {
        let {photoUrl}=this.state;
        if(!photoUrl) return '';
        return photoUrl;
        
    }

    logout()
    {
        firebase.auth().signOut();
        history.push('/login');
    }
    render()
    {
        
        return(
    
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" >
  <div className="container">
    <a className="navbar-brand" href="#">
          <img src="http://placehold.it/150x50?text=Logo" alt=""/> 
        </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto" style={{fontSize:20}} >
     
        
        <li className="nav-item active">
          <a className="nav-link" href="profile">
              {/* <img style={{ margin:'2px' , borderRadius:'50%', height:'50px'}}   src="https://www.w3schools.com/images/picture.jpg" alt="Mountain"/> 
             */}
            
            <img style={{ margin:'2px' , borderRadius:'50%', height:'50px'}}   src={this.getPhotoUrl()} alt="profilephoto"/> 
            
                <span className="sr-only">(current)</span>
              </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="profile">
        <div > {this.getName()} </div>
        
        </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Services</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         { this.getEmailOrName()}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="gamehistory" >Game history</a>
            <a className="dropdown-item" href="bankdetails" >Bank Details</a>
            <a className="dropdown-item" href="#" >Settings</a>
          <button className="dropdown-item" href="#" onClick={this.logout} >logout</button>
        </div>
      </li>
      </ul>
    </div>
  </div>
</nav>
                
        );
    }
}


export default HeaderNav;