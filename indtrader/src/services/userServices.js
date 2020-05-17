import * as firebase from 'firebase';

export default class UserServices{

    constructor()
    {

        this.loginWithEmail=this.loginWithEmail.bind(this);
        this.registerWithEmail=this.registerWithEmail.bind(this);
        this.updateUserProfile=this.updateUserProfile.bind(this);
        this.uploadProfilePhoto=this.uploadProfilePhoto.bind(this);
        this.removeProfilePhoto=this.removeProfilePhoto.bind(this);
    }
    
    loginWithEmail  = async (emailId, password, callback)  => {
       
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                firebase.auth().signInWithEmailAndPassword(emailId,password)
                .catch(e => 
                    {
                    return {errorMsg:e.message,result:null};
                    })
                .then(result => {
                    if(result.errorMsg)
                    {
                        callback( {errorMsg:result.errorMsg,result:null});
                    }
                    else
                    {
                        callback( { errorMsg:null, result:result.result}); 
                    }
                   
                });
    
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorMessage "+errorMessage);
        callback( {errorMsg:error.message,result:null}); 
      });
      
      }


      registerWithEmail  = async (emailId, password, userDetails, callback)  => {
        
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
           .then(() => {
               // Existing and future Auth states are now persisted in the current
               // session only. Closing the window would clear any existing state even
               // if a user forgets to sign out.
               // ...
               // New sign-in will be persisted with session persistence.
               firebase.auth().createUserWithEmailAndPassword(emailId,password)
               .catch(e => 
                   {
                   return {errorMsg:e.message,result:null};
                   })
               .then(result => {
                   if(result.errorMsg)
                   {
                       callback( {errorMsg:result.errorMsg,result:null});
                   }
                   else
                   {
                       this.updateUserProfile(userDetails,(res)=>{});
                       callback( { errorMsg:null, result:result.result}); 
                   }
                  
               });
   
     })
     .catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log("errorMessage "+errorMessage);
       callback( {errorMsg:error.message,result:null}); 
     });
     
     }


     updateUserProfile  = async (userDetails, callback)  => {

        var user = firebase.auth().currentUser;

            let profile={}
            if(userDetails.userName) profile.displayName = userDetails.userName;
            if(userDetails.photoURL) profile.photoURL = userDetails.photoURL;
            else  profile.photoURL = 'defaultPhoto.jpg';

            console.log('photo url is '+profile.photoURL);
            user.updateProfile(profile).then(function() {
            console.log('user details update succesfully');
            var userDetails = JSON.parse(localStorage.getItem('userDetails'));
            //Now will update local stroage
            if(profile.displayName) 
            {
                userDetails.displayName=profile.displayName;
            } 
            if(profile.photoURL) 
            {
                userDetails.photoURL=profile.photoURL;
            } 
            localStorage.setItem('userDetails',JSON.stringify(userDetails));
            console.log('localstorage updated ');
            callback({errorMsg:null});
            }).catch(function(error) {
                console.log('user details update failed '+ error.message);
                 callback({errorMsg:error.message});
            });
     }

     uploadProfilePhoto = async(imageFile,callback) =>
     {
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        let fileName=userDetails.userId;
        let pathReference = firebase.storage().ref('profilePhotos/'+fileName);
        pathReference.put(imageFile).then(res=>
            {
                this.updateUserProfile({photoURL:fileName},()=>{});
                console.log('upload finished');
                callback(res);
            });

     }

     removeProfilePhoto = async(callback) =>
     {
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        let fileName=userDetails.userId;
        let pathReference = firebase.storage().ref('profilePhotos/'+fileName);
        console.log("trying to delete photo "+fileName);
        pathReference.delete().then(res=>
            {
                console.log('photo deleted');
                this.updateUserProfile({s:'s'},()=>{callback(); });
                // callback(res);
                // this.updateUserProfile({s:'l'},()=>{});
            
            });
    }
   
}