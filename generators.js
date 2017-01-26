var domainlist = document.querySelector('#domainlist');
var domainobject = {};
var generatebutton = document.querySelector('#generate');

function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}

var socket = io('http://sockets.domainhydra.com'); // TIP: io() with no args does auto-discovery
socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
	socket.on('domains', function(domains) {
		domainlist.innerHTML = '';
		for(var i = 0; i < domains.length; i++) {
			var domainResult = createDomainResult(domains[i]);
			domainobject[domains[i]] = domainResult;
			domainlist.appendChild(domainResult);
		}
	});
	socket.on('dnsLookup', function(domain, available) {
		console.log(domain, available);
		domainobject[domain].classList.add(['unavailable','available'][available+0]);
	})
});

function createDomainResult(domain, tlds) {
	//tlds = tlds || ['com','org','net'];

	var el = document.createElement('div');
	el.classList.add('domainresult');

	var domain_span = document.createElement('span');
	domain_span.classList.add('domain');
	domain_span.textContent = domain /*+ '.'*/;
	el.appendChild(domain_span);

	/*for(var i = 0; i < tlds.length; i++) {
		var tld_span = document.createElement('span');
		tld_span.classList.add('tld');
		tld_span.textContent = tlds[i];
		el.appendChild(tld_span);
	}*/

	return el;
}

function generate() {
	socket.emit('tagData', tags);
	/*domainlist.innerHTML = '';
	for(var i = 0; i < 2; i++) {
		domainlist.appendChild(createDomainResult(combinewords()))
	}*/
}

generatebutton.addEventListener('click', generate);

function combinewords() {
	var tagsmod = tags.slice();
	var word1 = tagsmod.splice(random(0, tagsmod.length - 1), 1)[0];
	var word2 = tagsmod.splice(random(0, tagsmod.length - 1), 1)[0];
	return word1 + word2;
}
