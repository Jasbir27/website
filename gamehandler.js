var events = require('events');

module.exports = class gamehandler
{
    constructor(globalPlayersToMatchMap,globalMatchHandlers,gameId,noOfPlayers)
    {
        this.globalPlayersToMatchMap=globalPlayersToMatchMap;
        this.globalMatchHandlers=globalMatchHandlers;
        this.noOfPlayers=noOfPlayers;
        this.userIds=[];
        this.sockets={};
        this.userNames={};
        this.dpDownloadURLs={};
        this.gameId=gameId;
        this.globalMatchHandlers[gameId]=this;
        this.playerReady=0;
        // this.eventEmitter = new events.EventEmitter();
    
        // this.eventEmitter.on('message',function(message){
        //     console.log("message "+message);
        // });

        // this.eventEmitter.on('close',function(playerNum){
        //     delete socket[UserId];
        //     noOfPlayers=noOfPlayers-1;
        //     if(noOfPlayers===0){
        //         delete this;
        //     }
        // });


    }

    isAlreadyConnected(userId)
    {
        console.log('checking if alread connected '+userId+"  "+this.userIds.length);
        for(var i=0;i<this.userIds.length;i++)
        {
            console.log('cmpr '+userId+" with "+this.userIds[i]);
            if(this.userIds[i]===userId) 
            {
                return true;
            }
        }
        return false;
    }
    getNoOfPlayers()
    {
        return this.noOfPlayers;
    }

    onMessage(userId,msg)
    {
        console.log('msg rec from '+userId);
    }

    // onClose(userId)
    // {
    //     delete this.sockets[userId];
    //     this.noOfPlayers--;
    //     console.log('closing one socket');
    //     if(this.noOfPlayers===0)
    //     {
    //         console.log('closing the game');
    //         delete this;
    //     }
    // }

    addConnection(sc,userID)
    {
        let flag=this.isAlreadyConnected(userID);
        if(flag){

        }
        else
        {
            this.userIds.push(userID);
        }
            this.sockets[userID]=sc;

    
     sc.send(JSON.stringify({msgType:'query_userDetails'}));
    
    //  sc.on('message',this.onMessage(userID,message));
    sc.on('message', (message) => {
        console.log('message got from'+userID+' is '+message);
        let msg=JSON.parse(message);
        if(msg.msgType=='userDetails'){
            this.userNames[userID]=msg.userName;
            this.dpDownloadURLs[userID]=msg.dpDownloadURL;

            if(flag)
            {
                console.log("i am old");
                for(var i=0;i<this.userIds.length;i++)
                {
                    let currUserID=this.userIds[i];
                    if(this.userIds[i]===userID)
                    {
                        console.log("i am old sending to self");
                        var data={msgType:'addPlayer', userID:userID,userName:msg.userName,dpDownloadURL:msg.dpDownloadURL,gameId:this.gameId};
                        sc.send(JSON.stringify(data));
                    }
                    else
                    {
                        console.log("i am old sending to others to self");
                        data={msgType:'addPlayer', userID:this.userIds[i],userName:this.userNames[currUserID],dpDownloadURL:this.dpDownloadURLs[currUserID],gameId:this.gameId};
                        sc.send(JSON.stringify(data));
                    }
                }
                
            }
            else
            {
                console.log("i am new");
                this.globalPlayersToMatchMap[userID]=this.gameId;
                this.globalMatchHandlers[userID]=this;
                for(var i=0;i<this.userIds.length;i++)
            {
                let currUserID=this.userIds[i];
                if(this.userIds[i]===userID)
                {
                    var data={msgType:'addPlayer', userID:userID,userName:msg.userName,dpDownloadURL:msg.dpDownloadURL,gameId:this.gameId};
                    sc.send(JSON.stringify(data));
                }
                else
                {
                    var data={msgType:'addPlayer', userID:userID,userName:msg.userName,dpDownloadURL:msg.dpDownloadURL,gameId:this.gameId};
                    this.sockets[this.userIds[i]].send(JSON.stringify(data));
                    data={msgType:'addPlayer', userID:this.userIds[i],userName:this.userNames[currUserID],dpDownloadURL:this.dpDownloadURLs[currUserID],gameId:this.gameId};
                    sc.send(JSON.stringify(data));
                }
            }
            }

            this.playerReady=this.playerReady+1;
            if(this.playerReady===this.noOfPlayers)
            {
                this.startGame();
            }
            console.log("tot players live now:"+Object.keys(this.globalPlayersToMatchMap).length);
            
        }


    });
     sc.on('close',()=>
     {
         console.log('trying to disconnect '+userID);
       
         delete this.sockets[userID];
        //  for(var i=0;i<this.userIds.length;i++)
        //  {
        //      if(this.userIds[i]===userID)
        //      {
        //          this.userIds.splice(i,1);
        //      }
        //  }

     });
     console.log(this.userIds.length+" players connected");
    }

    isFull()
    {
        if(this.userIds.length == this.noOfPlayers)
        {
            return true;
        }
        return false;
    }

    
    startGame()
    {
        for(var i=0;i<this.userIds.length;i++)
        {
            if(this.userIds[i])
            {
                let data={msgType:'gameStarted'};
                this.sockets[this.userIds[i]].send(JSON.stringify(data));
            }
        }
    }
}