var SlackBot = require('slackbots');
var Moment = require('moment');
var fs = require('fs');

var bot = new SlackBot({
    token: 'xoxb-378034060054-378035433878-4eBDcIqb76n5juTU0mfPpMPg',
    name: 'wednesdaybot'
});

bot.on('start', function () {

    var params = {
        icon_emoji: ':frog:',
        icon_url: 'https://ih1.redbubble.net/image.489179920.2085/ap,550x550,12x12,1,transparent,t.u2.png'
    };

    let botId;
    const userArray = bot.getUsers()._value.members;
    console.log("BOTNAME: " + bot.name)
    userArray.map(function (proj) {
        console.log('USERSNAME:' + proj.name)
        if (proj.name == bot.name) {
            botId = proj.id;
        }
    })
    bot.postMessageToChannel('general', 'Ribbit!', params);

    let currentDate = Moment().format('dddd')

    bot.on('message', function (data) {
        
        if (data.type === 'message' && data.subtype != 'bot_message') {
            console.log(data)
            if (data.text.indexOf('date') >= 0) {
                
                //get a random video
                var content=fs.readFileSync('VideoPlaylist.json','utf8');
                let videoPlaylistArray = [];
                videoPlaylistArray = JSON.parse(content);
                let videoURL = videoPlaylistArray[Math.floor(Math.random()*videoPlaylistArray.length)].URL;
                bot.postMessageToChannel('general', 'It is ' + currentDate + ' my dudes.\n' + videoURL, params);
                
            }
            /*
            commands: add, check, play
            */
            //add
            if ((data.text.indexOf(botId) >= 0) && data.text.indexOf('-add')) {
                var commandArray = data.text.split(" ");
                //commandArray[0] = @WednesdayBot
                //commandArray[1] = -add
                let addingURL = commandArray[2] 

                /*
                1) check if element exists in file
                    if element exists, return that element and the adder
                    if the element does not exist, add to array with added
                */
                let videoPlaylistArray = [];
                /*fs.readFile('VideoPlaylist.json','utf8', function (err, data) {
                    if (err) throw err;
                    //videoPlaylistArray = JSON.parse(data);
                    return JSON.parse(data);
                });
                */
                var content=fs.readFileSync('VideoPlaylist.json','utf8');
                videoPlaylistArray = JSON.parse(content)
                
                console.log(videoPlaylistArray)
             
             let Added = false;
                for(x=0; x<videoPlaylistArray.length; x++){
                   console.log( videoPlaylistArray[x].URL)
                    if (videoPlaylistArray[x].URL == addingURL){
                        alreadyAdded = true;
                    }
                }
            if (Added){
                bot.postMessageToChannel('general', 'Ribbit!', params);
                //let user know it has been added by x user;
            }else{
                //
            }
                 
            
            }
            //check

            //play
        }
    });


});
