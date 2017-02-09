function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}

var socket = io('https://sockets.domainhydra.com'); // TIP: io() with no args does auto-discovery
socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
	socket.on('domains', function(domains) {
		domainlist.innerHTML = '';
		for(var i = 0; i < domains.length; i++) {
			var domainResult = createDomainResult(domains[i]);
			if(i === 0)  {
				domainResult.classList.add('selected');
				document.querySelector('#results').classList.remove('available', 'unavailable');
				document.querySelector('#results').classList.add(['available', 'unavailable'][random(0,1)]);
			}
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

	/*el.href = "https://ca.godaddy.com/domains/searchresults.aspx?domainToCheck=" + domain;
	el.target = "_blank";*/

	el.addEventListener('click', function(e) {
		document.querySelector('.selected').classList.remove('selected');
		this.classList.add('selected');
		document.querySelector('#results').classList.remove('available', 'unavailable');
		document.querySelector('#results').classList.add(['available', 'unavailable'][random(0,1)]);

		document.querySelector('#domaininfo .domainheader').textContent = domain;
	})

	var domainDiv = document.createElement('span');
	domainDiv.classList.add('domain');
	domainDiv.textContent = domain /*+ '.'*/;
	el.appendChild(domainDiv);

	var icon = document.createElement('i');
	icon.classList.add('fa', 'fa-angle-left', 'accordion-angle');
	el.appendChild(icon);

	var mobileDomainInfo = document.createElement('div');
	mobileDomainInfo.classList.add('mobiledomaininfo');
	el.appendChild(mobileDomainInfo);

	/*var domainHeader = document.createElement('h2');
	domainHeader.classList.add('domainheader');
	domainHeader.textContent = domain;
	mobileDomainInfo.appendChild(domainHeader);*/

	var availability = document.createElement('span');
	availability.classList.add('availability');
	availability.innerHTML = '<span class="not">NOT </span>AVAILABLE';
	mobileDomainInfo.appendChild(availability);

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

	taginput_el.blur();
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
