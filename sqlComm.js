var userNo = 0;
var sqlCo = "";

function print(){
	var sqlComm ='INSERT INTO users (username, password) VALUES ("34479d37b854612ec75f5cf195c9dbdd_agent_'+userNo+'", "34479d37b854612ec75f5cf195c9dbdd");\n';	
	userNo++;
	return sqlComm;
}

for(i = 0; i < 100001; i++){
	sqlCo += print();
}

console.log(sqlCo);