var xmppClient = require('node-xmpp-client');
var _ = require('underscore');

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
	var instance_jid = jid;
	var instance_pass = password;
	var ejabberdClient = new xmppClient({
    	jid: instance_jid,
    	password: instance_pass
	});

	ejabberdClient.on('online', function() {
		ejabberdClient.send('<presence/>');
		console.log("XMPP Client Connected");
		ejabberdClient.emit('xmpp:connected');
	});

	ejabberdClient.on('stanza', function(stanza) {
		console.log('Incoming stanza: ', stanza.toString());
	});

	ejabberdClient.on('error', function(error) {
		console.log('error ', error);
	});	
};

for(i=1; i < 101 ; i++){
	createEjabberd("34479d37b854612ec75f5cf195c9dbdd_agent_"+i+"@"+Config.host, "34479d37b854612ec75f5cf195c9dbdd");
}
