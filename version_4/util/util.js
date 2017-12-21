/* 
	This library includes all the utility functions
*/

module.exports = {
	logRequestMessage: logRequestMessage
}

function logRequestMessage(url, requestType){
	/* 
	this function prints out the log message about what is requested

		url: requested url
		requestType: HTTP request type  
	*/
	console.log(url + " (" + requestType + ")" + " has been requested");
}