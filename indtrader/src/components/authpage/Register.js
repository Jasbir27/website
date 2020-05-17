import React, {Component} from 'react';

class Register extends Component{

  constructor(props){
    super(props);
    
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleUserNameChage=this.handleUserNameChage.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handlePasswordChange1=this.handlePasswordChange1.bind(this);
    this.handlePasswordChange2=this.handlePasswordChange2.bind(this);

    var userDetails=this.props.userDetails;
    console.log('userDetails '+userDetails);
    this.state= {
      userName:userDetails.userName,
      emailId:userDetails.emailId,
      password1:userDetails.password,
      password2:userDetails.password
      
    };

  }

  handleSubmit(e)
  {
    e.preventDefault();
    var {userName} = this.state;
    var {emailId}= this.state;
    var {password1} = this.state;
    var {password2} = this.state;
    if(password1 != password2)
    {
      this.setState({passwordMistach:false});
      this.setState({passwordMistach:true});
      return ;
    }
    this.props.submitRegister(userName,emailId,password1);

  }

  handleEmailChange(e)
  {
    this.setState({emailId:e.target.value});
  }

  handleUserNameChage(e)
  {
    this.setState({userName:e.target.value});
  }

  handlePasswordChange1(e)
  {
    this.setState({password1:e.target.value});
  }

  handlePasswordChange2(e)
  {
    this.setState({password2:e.target.value});
  }

  renderErrorMsg()
  {
    var {errorMsg} = this.props;
    if(errorMsg) 
    return <h6 style={{color:'red'}}> {errorMsg}</h6>;
    return '';
  }

  renderPasswordMismatch()
  {
    var {passwordMistach} = this.state;
    if(passwordMistach) 
    return <h6 style={{color:'red'}}> password doesn't match. </h6>;
    return '';
  }


    render(){
        return (
            <div>
               
               <div className="container-fluid-flexbox ">
    <div className="row">
      <div className="col  ">
      <div className="card card-signin flexbox">
          <div className="card-img-left d-none d-md-flex">
       
          </div>
          <div className="card-body">
            
            <form className="form-signin" onSubmit={this.handleSubmit}>
            {this.renderErrorMsg()}
              <div className="form-label-group">
                <input type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus onChange={this.handleUserNameChage}></input>
                <label htmlFor="inputUserame">Username</label>
              </div>

              <div className="form-label-group">
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required  onChange={this.handleEmailChange}></input>
                <label htmlFor="inputEmail">Email address</label>
              </div>
              
              <hr></hr>

              <div className="form-label-group">
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required  onChange={this.handlePasswordChange1}></input>
                <label htmlFor="inputPassword">Password</label>
              </div>
              
              <div className="form-label-group">
                <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange2}></input>
                <label htmlFor="inputConfirmPassword">Confirm password</label>
              </div>
            {this.renderPasswordMismatch()}
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
              
              <hr className="my-4"></hr>
              <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign up with Google</button>
              <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
            </div>
        );
    }

}

export default Register;