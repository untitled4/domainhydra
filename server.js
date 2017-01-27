var https = require('https'); // FIGURE OUT HOW TO USE HTTPS
var io = require('socket.io')(8880);
var dns = require('dns');

function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}
function combinewords(tags) {
	var tagsmod = tags.slice();
	var word1 = tagsmod.splice(random(0, tagsmod.length - 1), 1)[0];
	var word2 = tagsmod.splice(random(0, tagsmod.length - 1), 1)[0];
	return word1 + word2;
}

io.on('connection', function (socket) {
	socket.on('tagData', function (tags) {
		var domains = generateDomains(tags);
		io.emit('domains', domains);

		for(var i = 0; i < domains.length; i++) {
			dnsLookup(domains[i]);
		}
	});
});

function dnsLookup(domain) {
	dns.lookup(domain, function(err, address, family) {
		var available;
		if(err != null && err.code == 'ENOTFOUND') {
			available = true;
		}else{
			available = false;
		}
		io.emit('dnsLookup', domain, available);
		//io.emit('dnsLookup', { : false });
	});
}

function generateDomains(tags) {
	var domains = [];
	for(var i = 0; i < 20; i++) {
		domains.push(combinewords(tags) + '.com');
	}
	return domains;
}
