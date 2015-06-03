var xmppClient = require('node-xmpp-client');
var _ = require('underscore');
var ltx = require('ltx');
var sys = require("sys");
fs = require('fs');

var ejabberdClients = [];
var limit = process.argv[2];

/*var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");
    if(d  "connect")
  });*/

var Constants = {
	PUBSUB : "livechat:pubsub",
	USER_CHANNELS_PREFIX : "USER_CHANNELS_",
	CHANNEL_PREFIX : "LIVECHAT_CHANNEL_",
	PRESENCE_PREFIX_AGENT :"PRESENCE_AGENT_",
};

var Config = {
	username : 'admin123123',
	password : 'test',
	host : 'ejabberd',
	bosh : 'http://localhost:5280/http-bind/'
};

Config.jid = Config.username+'@'+Config.host;

function createEjabberd(jid, password){
	this.jid = jid;
	this.pass = password;
	this.host = Config.host;
	this.startTime = new Date().getTime();
	this.ejabberdClient = new xmppClient({
    	jid: this.jid,
    	password: this.pass
	});
	this.listeners();	
};

createEjabberd.prototype.listeners = function(){
	this.ejabberdClient.on('online', function() {
		this.connectedTime = new Date().getTime();
		this.connected = true;
		console.log(this.jid)
		this.ejabberdClient.send('<presence/>');
		this.subscribe("presence-asdasdasdasdsadasdasdsad");
	}.bind(this));
	this.ejabberdClient.on('stanza', function(stanza) {
		if(stanza.name === 'iq' && stanza.attrs.id ==="idd"){
			this.subscribeCallbackTime = new Date().getTime();
			this.timeTaken = this.subscribeCallbackTime - this.subscribeTime;
			this.connectedTimeTaken = this.connectedTime - this.startTime;
			console.log(this.timeTaken);
			var Filed = this.user_id +","+connectedTimeTaken+","+ this.timeTaken + "\n";
			fs.appendFile('test-case-'+limit,Filed,function(err){
				if(err){
					console.log("error");
				}
			});
		}
	}.bind(this)); 

	this.ejabberdClient.on('error', function(error) {
		console.log('error ', error);
	});	
}

createEjabberd.prototype.pushToChannel = function(channelName){

	var payload="testttttttt";
	var stanza = new ltx.Element('iq',
			{	from : this.jid,
				to : this.host,
				type : 'set',
				id : "idd" })
			.c('publish',{xmlns : Constants.PUBSUB , to : channelName } )
			.c('livechat_Event',{type : eventType})
			.t(JSON.stringify(payload));
	this.ejabberdClient.send(stanza.tree());	
};

createEjabberd.prototype.subscribe = function(channelName){
	this.subscribeTime = new Date().getTime();
	var stanza = new ltx.Element('iq',
			{	from : this.jid,
				to : this.host,
				type : 'set',
				id : "idd" })
			.c('subscribe',{xmlns : Constants.PUBSUB , to : channelName } )
			.t(channelName);
	this.ejabberdClient.send(stanza.tree());	

}
createEjabberd.prototype.unsubscribe = function(channelName){

	var stanza = new ltx.Element('iq',
			{	from : this.jid,
				to : this.host,
				type : 'set',
				id : "idd" })
			.c('unsubscribe',{xmlns : Constants.PUBSUB , to : channelName } )
			.t(channelName);
	this.ejabberdClient.send(stanza.tree());	
			
}

connectEjabberd(0, limit);

function connectEjabberd(start, limit){
	if(start > limit){
		return;
	}
	for(i=start; i < limit ; i++){
		if(!ejabberdClients[i] || !ejabberdClients[i].connected){
			ejabberdClients[i] = new createEjabberd("34479d37b854612ec75f5cf195c9dbdd_agent_"+i+"@"+Config.host, "34479d37b854612ec75f5cf195c9dbdd");
			ejabberdClients[i].user_id = i;
		}
	}

}
