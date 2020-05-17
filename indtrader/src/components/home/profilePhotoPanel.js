import React from 'react';
import * as firebase from 'firebase';
import UserServices from '../../services/userServices';

export default class ProfilePhoto extends React.Component{

    constructor(props){
        super(props);
        this.state = {file: null,imagePreviewUrl: null,photoUrl:null , mod:'view'};
        this.handleImageChange=this.handleImageChange.bind(this);
        this.getImageUrl=this.getImageUrl.bind(this);
        this.renderButtons=this.renderButtons.bind(this);
        this.getUploadButton=this.getUploadButton.bind(this);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleCancelClick=this.handleCancelClick.bind(this);
        this.handleUploadClick=this.handleUploadClick.bind(this);
        this.handleRemoveClick=this.handleRemoveClick.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {

        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
 
        var pathReference = firebase.storage().ref('profilePhotos/'+userDetails.photoURL);
        pathReference.getDownloadURL().then(url => {
            console.log('url '+url);
            this.setState({photoUrl:url});
        });

      }
    
    getImageUrl()
    {
        let {imagePreviewUrl,photoUrl} = this.state;
        if (!(imagePreviewUrl || photoUrl)) return require('../../assets/videos/imageLoadingSpinner.gif');
        else 
        {
            if(imagePreviewUrl) return imagePreviewUrl;
            if(photoUrl) return photoUrl;
            return '"https://bootdey.com/img/Content/user-453533-fdadfd.png';
        }
    }
    handleImageChange(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('here '+e.target.value);
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log('file '+file);
        reader.onloadend = () => {
            console.log('action completed');
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                filePath:file
              });
                //   this.setState({
                //     file: file,
                //     imagePreviewUrl: reader.result
                //   });
                }

                reader.readAsDataURL(file);

      }

      handleEditClick()
      {
          this.setState({mod:'changeInit'});
      }

      handleCancelClick()
      {
          this.setState({mod:'view' , imagePreviewUrl : null, file:null});
        console.log('cancel clicked');
      }

      handleUploadClick()
      {
        let obj= new UserServices();
        
        let {file} = this.state;
        obj.uploadProfilePhoto(file,()=>{
            console.log('file upload finished');
            window.location.reload(true);
        });
      }

      handleRemoveClick()
      {
        let obj= new UserServices();
        obj.removeProfilePhoto(()=>{ 
            this.setState({mod:'view' , imagePreviewUrl : null, file:null});
            window.location.reload(true);

        }).then(()=>
        {
            this.setState({mod:'view' , imagePreviewUrl : null, file:null});
           
            // window.location.reload(true);
            
        });

      }
    getUploadButton()
    {
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        let {mod,imagePreviewUrl}=this.state;
        if ( mod === 'changeInit')
        {
            if(imagePreviewUrl)
            {
               return <button  style={{marginTop:'2%', marginLeft:'3%', marginRight:'3%' }} onClick={this.handleUploadClick}>Upload</button>;
            }
            else
            {
                return '';
            }
        }
        return '';
    }

    renderRemovePhotoButton()
    {
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if(userDetails.photoURL==='defaultPhoto.jpg')
        {
            return <button disabled style={{marginTop:'0%', marginLeft:'3%', marginRight:'3%' }} >Remove photo</button>;
                 }
        else
        {
           return  <button  style={{marginTop:'0%', marginLeft:'3%', marginRight:'3%' }}  onClick={this.handleRemoveClick}>Remove photo</button>;
                 }
    }
    renderButtons()
    {
        let {mod}=this.state;
        if(mod==='changeInit')
        {
            return ( <div style={{  position:'relative' , top:'0' , background:'transparent'} } > 
            {/* <button style={{marginTop:'0%', marginLeft:'3%', marginRight:'3%' }}  >Remove photo</button> */}
            {/* <button  style={{marginTop:'0%', marginLeft:'3%', marginRight:'3%' }} >Change photo</button> */}
            <input type="file" onChange={this.handleImageChange}  ></input>
            {this.getUploadButton()}
            <div >
           
            <button  style={{marginTop:'2%', marginBottom:'1%', marginLeft:'3%', marginRight:'3%' }} onClick={this.handleCancelClick}>Cancel</button>
            </div>
            
            </div>);
        }
       
        if(mod==='view')
        {
            
            return ( <div style={{  position:'relative' , top:'0' , background:'transparent'} } > 
            {/* <button style={{marginTop:'0%', marginLeft:'3%', marginRight:'3%' }}  >Remove photo</button> */}
            <button  style={{marginTop:'0%', marginBottom:'2%', marginLeft:'3%', marginRight:'3%' }} onClick={this.handleEditClick}>Change photo</button>
            {/* <input type="file" onChange={this.handleImageChange}  ></input> */}
            {
                this.renderRemovePhotoButton()
            }
              </div>);
        }
    }
    render()
    {
        return(
            <div className="row justify-content-center " style={{ background:'white'}}>
                    <div className="col-md-6" style={{  background:'transparent' }}>
                        <img alt="" style={{ background:'transparent',width:'200px', height:'200px',   borderRadius:'50%'}}  className="img-circle img-thumbnail isTooltip" src={this.getImageUrl()} data-original-title="Usuario" /> 
                    
                     {this.renderButtons()}
                    </div>
                   
                </div>
        );
    }

}