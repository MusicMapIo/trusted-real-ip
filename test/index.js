var trustedRealIp = require('../'),
	assert = require('assert');

describe('Trusted Real IP', function() {
	beforeEach(function() {
		trustedRealIp('foobar');
	});

	it('should encrypt and decript from secret', function() {
		var ip = '192.168.1.1';
		assert.equal(ip, trustedRealIp.verify(trustedRealIp.encode(ip)));
	});

	it('should generate unique hashes for different ips', function() {
		assert.notEqual(trustedRealIp.encode('192.168.1.1'), trustedRealIp.encode('192.168.1.2'));
	});

	it('should return false when the hash does not verify', function() {
		var val = trustedRealIp.encode('192.168.1.2');
		trustedRealIp('not-the-right-secret');
		assert.equal(false, trustedRealIp.verify(val));
		trustedRealIp('foobar');
		assert.equal('192.168.1.2', trustedRealIp.verify(val));
	});
});
