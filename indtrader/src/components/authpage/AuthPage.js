import React from 'react';


import {Container,Row,Col,Button} from 'react-bootstrap';


import Login from './Login'
import Register from './Register';
import {authActions} from "../../actions"
import {Spinner} from '../misc';
import { connect } from 'react-redux';
import {auth_page, auth_page_navbar_tab1_active, auth_page_navbar_tab2_active,auth_page_navbar_tab1_inactive, auth_page_navbar_tab2_inactive,auth_page_pane} from './styles.js';
import { history } from '../../helper';


import  UserServices from '../../services/userServices';


// const contentTransitionStyle = 'transform 0.6s ease-in';



    class  AuthPage  extends  React.Component {
    constructor (props) {
        super(props);
  
        this.state = {
          tabKey: this.props.tabKey,
          userDetails : {
              userName:'',
              emailId :'',
              password:'',
              remeberMe:''
          },
          spinnerFlag:false,
          errorMsg:null
        }
        this.onPressTab = this.onPressTab.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
  


      }

      
    componentDidUpdate(prevProps, prevState, snapshot) {



        if (this.props.tabKey !== prevProps.tabKey) {
          this.setState({ tabKey: this.props.tabKey })
        }
      }
    
      onPressTab(key) {
      this.setState({ tabKey: key } );
      }

      submitLogin(emailId,password)
      {
        let obj= new UserServices();
        this.setState({spinnerFlag:true , errorMsg:null});
        obj.loginWithEmail(emailId,password, (res)=> { 
          console.log('res '+res);
          if(res.errorMsg){
            this.setState({spinnerFlag:false , errorMsg:res.errorMsg});
            
          }
          else
          {
            history.push("/");
          }

          
      });
      
      }
    
    
      submitRegister(userName,emailId,password)
      {
        let userDetails={
        }

        if(userName)
        {
          userDetails.userName = userName;
        }
        let obj= new UserServices();
        if (emailId && password )
          {
            this.setState({spinnerFlag:true , errorMsg:null});

            obj.registerWithEmail(emailId,password,userDetails, (res)=> { 
              console.log('res '+res);
              if(res.errorMsg){
                this.setState({spinnerFlag:false , errorMsg:res.errorMsg});
                
              }
              else
              {
                history.push("/");
              }
    
              
          });


          }

        
      
      }

     

    renderContent()
    {
        // if(this.getState)
        const  tabKey = this.state['tabKey'];
        const userDetails = this.state['userDetails'];
        const { errorMsg} = this.state;
        console.log(" errorMsg errorMsg "+errorMsg);
        if ( errorMsg )
        {
          console.log('hey this time its error');
          this.leftContent=<Login submitLogin={this.submitLogin} userDetails={userDetails}  errorMsg={errorMsg}/>;
        }
        else 
        this.leftContent=<Login submitLogin={this.submitLogin} userDetails={userDetails}/>;

        if(errorMsg)
        {
          this.rightContent=<Register submitRegister={this.submitRegister} userDetails={userDetails}  errorMsg={errorMsg} />;
        }
        else 
        this.rightContent=<Register submitRegister={this.submitRegister} userDetails={userDetails}   />;

        if(tabKey==='1')
        return this.leftContent;
        if(tabKey==='2') return this.rightContent;
    }

    renderTab()
    {
        const  tabKey = this.state['tabKey'];

        if(tabKey==='1')
        return <Row  style={{background : 'transparent'}}>
            <Col style={{background:'transparent' , padding: '0px'}}> 
        <Button  style={auth_page_navbar_tab1_active} onClick={() => this.onPressTab('1')}> Sign In</Button>
        </Col>
        <Col style={{background:'transparent' , padding: '0px'}}> 
        <Button  style={auth_page_navbar_tab2_inactive} onClick={() => this.onPressTab('2')}> Register </Button>
        </Col>
        </Row>;

    if(tabKey==='2')
    return <Row  style={{background : 'transparent'}}>
        <Col style={{background:'transparent' , padding: '0px'}}> 
    <Button  style={auth_page_navbar_tab1_inactive} onClick={() => this.onPressTab('1')}> Sign In</Button>
    </Col>
    <Col style={{background:'transparent' , padding: '0px'}}> 
    <Button  style={auth_page_navbar_tab2_active} onClick={() => this.onPressTab('2')}> Register </Button>
    </Col>
    </Row>;
    }

    renderSpinner()
    {
      // const { currentAction } = this.props;
      // console.log("currentAction "+currentAction);
      // if(currentAction === '') return "";
      // if ( currentAction === 'loggingIn')
      // return<div style={{position:'absolute', top:'0px', left:'0px' , background:'transparent', width:'100%', height:'100%', zIndex:'2', alignItems:'center', verticalAlign:'middle'}}>
      // <Spinner></Spinner>
      // </div>;

      console.log("spinner cchked");
      var spinnerFlag = this.state['spinnerFlag'];
      console.log("spinner cchked "+spinnerFlag);
      if ( spinnerFlag )
      return<div style={{position:'absolute', top:'0px', left:'0px' , background:'transparent', width:'100%', height:'100%', zIndex:'2', alignItems:'center', verticalAlign:'middle'}}>
      <Spinner></Spinner>
      </div>;
      else return '';

    }
    render() {
       return (
        
          <div style={auth_page}>
 
          

      {this.renderSpinner()}
      
               <div style={{position:'relative', top:'0px', left:'0px' , background:'transparent', width:'100%',height:'100%',zIndex:'1'}}>
                   <Container fluid>
               
               {this.renderTab()}
           
           <Row   >
               <Col style={auth_page_pane}> { this.renderContent() }</Col>
               
           </Row>
         
       </Container></div>
       </div>
  
         
    );
    }}


    function mapState(state) {
      const { currentAction } = state.authentication;
      return { currentAction };
  }
  
  const actionCreators = {
      login: authActions.login
  };

  const connectedLoginPage = connect(mapState, actionCreators)(AuthPage);
export { connectedLoginPage as AuthPage };


