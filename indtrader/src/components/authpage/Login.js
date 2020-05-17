import React, {Component} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Container, Row, Col } from 'react-grid-system';
class Login extends Component{
  constructor (props) {
    super(props);
    this.emailId=this.props.emailId;
    this.password=this.props.password;

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);

    var userDetails=this.props.userDetails;
    this.state= {
      emailId:userDetails.emailId,
      password:userDetails.password
    };
  }

  handleSubmit(e)
  {
    e.preventDefault();
    var {emailId}= this.state;
    var {password} = this.state;
    this.props.submitLogin(emailId,password);
    

  }

  handleEmailChange(e)
  {
    this.setState({emailId:e.target.value});
  }

  handlePasswordChange(e)
  {
    this.setState({password:e.target.value});
  }

  renderErrorMsg()
  {
    var {errorMsg} = this.props;
    if(errorMsg) 
    return <h6 style={{color:'red'}}> {errorMsg}</h6>;
    return '';
  }
    render(){
        return (
            <div>
               
                <div className="container-fluid-flexbox " >
                  
    <div className="row">
      <div className="col">
        <div className="card card-signin flexbox">
          <div className="card-body">
            
            {this.renderErrorMsg()}
            <form className="form-signin" onSubmit={this.handleSubmit}>
            
              <div className="form-label-group">
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={this.handleEmailChange}></input>
                <label htmlFor="inputEmail">Email address</label>
              </div>

              <div className="form-label-group">
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange}></input>
                <label htmlFor="inputPassword">Password</label>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1"></input>
                <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
              </div>
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              <hr className="my-4"></hr>
              <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">Sign in with Google</button>
              <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"> Sign in with Facebook</button>
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

export default Login;