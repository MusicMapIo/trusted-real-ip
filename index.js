var crypto = require('crypto');

var tip = module.exports = function(secret) {
	tip.secret = secret;
	return tip;
};

tip.encode = function(ip) {
	return crypto.createHash('md5').update(ip + tip.secret).digest('hex') + ' ' + ip;
};

tip.verify = function(val) {
	var ip = val.split(' ')[1];
	if (val === tip.encode(ip)) {
		return ip;
	}
	return false;
};

tip.header = 'X-Trusted-IP';

tip.setHeader = function(ip, headers) {
	headers = headers || {};
	headers[tip.header] = tip.encode(ip);
};

tip.setIP = function(req) {
	var ip = tip.verify(req.get(tip.header));
	if (ip) {
		req.ip = ip;
	}
};
