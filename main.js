/*

TODO

*[ ] Apply for Verison TLD Zone data access
 [ ] Download Zone files to droplet
 [ ] Add landing page promotional section for SEO
 [ ] Write landing page SEO
 [ ] Put Generate button inside input container
 [X] Mobile
	*[X] input width 100%
	*[X] domaininfo as accordion with domain name list
	 [X] colour address bar
	 [ ] X scrolling input
	 [X] Make text bigger
	 [X] Put angle icons in .domainresult
	*[X] Make input fixed when scroll too far, but not title
	 [X] fill space taken from input
*[ ] Work on generators
*[X] create buttons in domaininfo for different registrars (begin collecting registrar affiliates)
 [X] Copyright section
 [ ] Privacy policy
 [ ] Facebook share button
 [ ] Twitter share button
 [ ] G+ share button
 [ ] LinkedIn share button
 [ ] Check available social media accounts related to domain name
 [ ] Work on backlinks (linking to site from other sites) and promotion
 [ ] Create link and image for links in slack/twitter/facebook etc.
 [ ] Set up DomainHydra email address
 	? contact@domainhydra.com
	? feedback@domainhydra.com
	? help@domainhydra.com
 [X] Allow commas to separate tags
 [X] Make inputing tags work on mobile
 [?] Possibly switch to `onbeforeinput` instead of `oninput`
 [X] Make background color of #domaininfo change
 [X] Make domain name in #domaininfo change
 [ ] Add GoDaddy button in #domaininfo
 [ ] Add BlueHost button in #domaininfo (only for certain domains :P)
 [X] Use fontawesome for now, can reduce loadtime later
 [X] Implement fontawesome
 [X] Hide box before entering tags
 [ ] Put registrar buttons in table to display 2 columns per row
*/

document.querySelector('.year').textContent = new Date().getFullYear();

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function createTag(text) {
	text = capitalize(text); // just in case it hasn't been done already

	var el = document.createElement('span');
	el.classList.add('tag');
	el.textContent = text;

	//var svg = document.createElement('img');
	//svg.classList.add('remove');

	//el.appendChild(svg);

	var icon = document.createElement('i');
	icon.classList.add('fa', 'fa-close', 'remove');

	el.appendChild(icon);

	icon.addEventListener('click', function(e) {
		deleteTag(el);
	})

	tags_el.appendChild(el);

	//svg.src = 'svg/close.svg';

	tags.push(text);
}

function deleteTag(el) {
	tags.splice(tags.indexOf(el.textContent), 1);
	el.parentElement.removeChild(el);
}

function stripSpaces(str) {
	return str.replace(/ /g, '');
}

function capitalize(str) {
	if(str.length == 0) return str;
	return str[0].toUpperCase() + str.slice(1);
}

function enterTag(value) {
	if(value != '') {
		createTag(value);
		this.value = '';
	}
	setTimeout(function() {
		taginput_el.value = '';
	}, 0);
}

taginput_el.addEventListener('keydown', function(e) {
	var value = stripSpaces(this.value);
	if(e.keyCode == 13/* || e.keyCode == 32*/) { // Enter || Space
		enterTag.bind(this)(value);
		generate();
	}
	if(e.keyCode == 8) {
		if(value == '') {
			deleteTag(tags_el.children[tags_el.children.length - 1])
		}
	}
})

taginput_el.addEventListener('input', function(e) {
	var value = this.value;
	value = value.split(/[ ,]+/g);

	if(value.length > 1) {
		for(var i = 0; i < value.length; i++) {
			enterTag.bind(this)(value[i]);
		}
	}

	taginput_el.value = capitalize(taginput_el.value);

	var textwidthchecker = document.querySelector('#textwidthchecker');
	textwidthchecker.textContent = taginput_el.value;

	taginput_el.style.width = (textwidthchecker.clientWidth + 20) + 'px';
});

taginput_el.addEventListener('blur', function(e) {
	var value = stripSpaces(this.value);
	if(value != '') {
		createTag(value);
		this.value = '';
	}
})

inputcontainer_el.addEventListener('click', function(e) {
	taginput_el.focus();
})


window.addEventListener('scroll', function() {
	if(document.body.scrollTop > scrollHeightMarker) {
		stickonscroll.classList.add('fixed');
		emptyspace.style.height = freeSpaceMarker + 'px';
	} else {
		stickonscroll.classList.remove('fixed');
		freeSpaceMarker = stickonscroll.offsetHeight;
		scrollHeightMarker = stickonscroll.offsetTop;
		emptyspace.style.height = 0;
	}
})
