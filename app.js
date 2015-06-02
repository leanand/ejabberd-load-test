var xmppClient = require('node-xmpp-client');
var _ = require('underscore');
var ltx = require('ltx');
var sys = require("sys");

var ejabberdClients = [];
/*var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");
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
	host : 'localhost',
	bosh : 'http://localhost:5280/http-bind/'
};

Config.jid = Config.username+'@'+Config.host;

function createEjabberd(jid, password){
	this.jid = jid;
	this.pass = password;
	this.host = Config.host;

	this.ejabberdClient = new xmppClient({
    	jid: this.jid,
    	password: this.pass
	});
	this.listeners();	
};

createEjabberd.prototype.listeners = function(){
	this.ejabberdClient.on('online', function() {
		console.log(this.jid)
		this.ejabberdClient.send('<presence/>');
		//this.subscribe("presence-asdasdasdasdsadasdasdsad");
	}.bind(this));
	this.ejabberdClient.on('stanza', function(stanza) {
		//console.log('Incoming stanza: ', stanza.toString(), this.jid);
	}.bind(this)); 

	this.ejabberdClient.on('error', function(error) {
		console.log('error ', error);
	});	
}

createEjabberd.prototype.pushToChannel = function(channelName){
	console.log("Pushinggggg")

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
	console.log("Subscribinggggggg")
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
	console.log("unSubscribinggggggg")

	var stanza = new ltx.Element('iq',
			{	from : this.jid,
				to : this.host,
				type : 'set',
				id : "idd" })
			.c('unsubscribe',{xmlns : Constants.PUBSUB , to : channelName } )
			.t(channelName);
	this.ejabberdClient.send(stanza.tree());	
			
}

for(i=0; i < 100000 ; i++){
	ejabberdClients[i] = new createEjabberd("34479d37b854612ec75f5cf195c9dbdd_agent_"+i+"@"+Config.host, "34479d37b854612ec75f5cf195c9dbdd");
}
