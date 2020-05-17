import React from 'react';
import * as firebase from 'firebase';
import UserServices from '../../services/userServices';

import ProfilePhoto from './profilePhotoPanel';


export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.renderNameRow=this.renderNameRow.bind(this);
        this.renderPhoneRow=this.renderPhoneRow.bind(this);
        this.handleNameEditClick=this.handleNameEditClick.bind(this);
        this.handlePhoneEditClick=this.handlePhoneEditClick.bind(this);
        this.handleNameCancelClick=this.handleNameCancelClick.bind(this);
        this.handlePhoneCancelClick=this.handlePhoneCancelClick.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this);
        this.handleNameUpdateClick=this.handleNameUpdateClick.bind(this);
        this.handleGetOTPClick=this.handleGetOTPClick.bind(this);

        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        this.state={nameEdit:false, phoneEdit:false , userName:userDetails.displayName, newName:userDetails.displayName,
        phoneNumber:userDetails.phoneNumber, newPhoneNumber:userDetails.phoneNumber,email:userDetails.email};

    }

    handleNameChange(e)
    {
        this.setState({newName:e.target.value});
    }

    handlePhoneChange(e)
    {
        this.setState({newPhoneNumber:e.target.value});
    }

    handleNameEditClick()
    {
        this.setState({nameEdit:true});
    }

    handleNameUpdateClick()
    {
        let {newName}=this.state;
        let obj= new UserServices();
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        obj.updateUserProfile({userName:newName, photoURL:userDetails.photoURL},()=>
        {
            window.location.reload(true);
        }
        );
        // let {userName}=this.state;
        // this.setState({nameEdit:false,newName:userName});
    }

    handleNameCancelClick()
    {
        let {userName}=this.state;
        this.setState({nameEdit:false,newName:userName});
    }


    handlePhoneEditClick()
    {
        this.setState({phoneEdit:true});
    }

    handlePhoneCancelClick()
    {
        let {phoneNumber}=this.state;
        this.setState({phoneEdit:false,newPhoneNumber:phoneNumber});
    }
    
    handleGetOTPClick()
    {
        // document.querySelector('recaptcha').textContent =  'hi';
        // return ;
        let {newPhoneNumber}=this.state;
        console.log('requesting otp on phone : '+newPhoneNumber);
        window.recaptchaVerifier  = new firebase.auth.RecaptchaVerifier('recaptcha');
        let number = newPhoneNumber ;
        var provider = new firebase.auth.PhoneAuthProvider();
        provider.verifyPhoneNumber(number,  window.recaptchaVerifier).then( (verificationId) => {
          var verificationCode = prompt('Enter the OTP sent on '+number+ ': ');
    
            if(verificationCode === null) return;
            return firebase.auth.PhoneAuthProvider.credential(verificationId,
                verificationCode);
    
        }).then((phoneCredential) => {
            let user=firebase.auth().currentUser;
            user.updatePhoneNumber(phoneCredential);
            this.setState({phoneEdit:false,phoneNumber:newPhoneNumber});
            var userDetails = JSON.parse(localStorage.getItem('userDetails'));
            userDetails.phoneNumber=newPhoneNumber;
            localStorage.setItem('userDetails',JSON.stringify(userDetails));
            console.log("state set");
            
          })
        .catch(function (error) {
            console.error( error);
    
        });

    }    


    renderNameRow()
    {
        let {nameEdit,userName,newName}= this.state;

        if(nameEdit)
        {
            return (<tr>
                <td  style={{textAlign:'left'}}>
                    <strong>
                    Name
                    </strong>
                </td> 
                <td  className='text-primary' style={{textAlign:'left'}} >
                    
                    <input type="text" autoFocus value = {newName} onChange={this.handleNameChange}/> 
                    </td>
                <td style={{textAlign:'right'}} > 
                <button style={{width:'35%' , margin:'5%'}} onClick={this.handleNameUpdateClick}>Update</button>
                <button style={{width:'35%'}} onClick={this.handleNameCancelClick}>Cancel</button>
                </td>
             </tr>);
        }
        else
        {
            return (<tr>
                <td  style={{textAlign:'left'}}>
                    <strong>
                    Name
                    </strong>
                </td> 
                <td  className='text-primary' style={{textAlign:'left'}}> {userName} </td>
                <td style={{textAlign:'right'}} > 
                <button style={{width:'35%'}} onClick={this.handleNameEditClick}>Edit</button>
                </td>
             </tr>);
        }
       
    }

    renderPhoneRow()
    {
        let {phoneEdit,phoneNumber,newPhoneNumber}= this.state;
        console.log('phoneEdit '+phoneEdit);
        if(phoneEdit)
        {
           return ( <tr>
                <td style={{textAlign:'left'}}>
                    <strong>Phone</strong>
                </td>
                <td  className='text-primary' style={{textAlign:'left'}} >
                <input type="text" autoFocus value = {newPhoneNumber} onChange={this.handlePhoneChange}/> 
                </td>
                
                <td style={{textAlign:'right'}} > 
                <button style={{width:'35%' , margin:'5%'}} onClick={this.handleGetOTPClick}>Update</button>
                <button style={{width:'35%'}} onClick={this.handlePhoneCancelClick}>Cancel</button>
                </td>
                
             </tr> );
        }
        else
        { // edited
            
                return (
                    <tr>
                    <td style={{textAlign:'left'}}>
                        <strong>Phone</strong>
                    </td>
                    <td  className='text-primary' style={{textAlign:'left'}} >{phoneNumber} </td>
                    <td style={{textAlign:'right'}} > <button style={{width:'35%'}} onClick={this.handlePhoneEditClick}>Edit</button></td>
                 </tr> );
            
        }
        
    }

    renderCaptcha()
    {
        let {phoneEdit} = this.state;
        if(phoneEdit)
        {
            return <tr>
                          <td></td>
                          <td colSpan='2' ><div id="recaptcha" ></div></td>
                      </tr>;
        }
        else 
        {
            return '';
        }
    }
    render()
    {
        let {email}= this.state;
        return (

            <div className="container bootstrap snippet" style={{background:'white'}}>
            <div className="panel-body ">
   

               <ProfilePhoto></ProfilePhoto>
     
                <div className="row justify-content-center" style={{alignItems:'center'}}>
                 
                 <table className="table table-hover " style={{maxWidth:'700px'}}>
                      <tbody className= " ">
                      {this.renderNameRow()}
                      {this.renderCaptcha()}
                      {this.renderPhoneRow()} 
                      
                      <tr>  
                        <td style={{textAlign:'left'}}>
                        <strong>Email</strong>
                        </td>
                        <td className='text-primary' style={{textAlign:'left'}} >{email}</td>
                        <td style={{textAlign:'right'}}>.</td>
                     </tr>
                     </tbody>
                 </table>
                </div>
            </div>
            </div>                                        
        );
    }
}

