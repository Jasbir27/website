
module.exports = class userServices
{
    constructor(defaultDatabase,detaultStorage)
    {
        this.defaultDatabase=defaultDatabase;
        this.detaultStorage=detaultStorage;
    }

    getUserProfileDetails(userID,callback)
    {
        // this.defaultDatabase.ref('/users/' + 'vzCG5CYTjGeP2Q9RZq8O79SjmR63').once('value').catch(function(error) {
            // Handle Errors here.
            this.defaultDatabase.ref('/users/' + userID+'/profileDetails').once('value').catch(function(error) {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          }).then((snapshot) => {
            // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            let data = snapshot.val();
            console.log('outside username:'+JSON.stringify(snapshot.val()));
            let userName=data.userName;

            this.detaultStorage.ref('profilePhotos/'+userID);
            pathReference.getDownloadURL().catch(function(error){
                console.log('error in getting dp :'+error);
            }).then(url => {
                console.log('url '+url);
                userDetails['dpDownloadURL']=url;
                localStorage.setItem('userDetails',JSON.stringify(userDetails));
                this.setState({photoUrl:url});
            });

            callback(userName);


            // ...
          });
    }
}