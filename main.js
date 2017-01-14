/*

TODO:
- there should be more padding on the bottoms of tags rather than being equal
- gradient border??
- logo
- actually generate domains
- check domain availability
- generate button loading animation
*/

var tags_el = document.querySelector('#tags');
var tags = [];
var taginput_el = document.querySelector('#taginput');
var inputcontainer_el = document.querySelector('#inputcontainer');

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

	var svg = document.createElement('img');
	svg.classList.add('remove');

	el.appendChild(svg);

	tags_el.appendChild(el);

	svg.src = 'svg/close.svg';

	tags.push(text);
	svg.addEventListener('click', function(e) {
		deleteTag(el);
	})
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

taginput_el.addEventListener('keydown', function(e) {
	var value = stripSpaces(this.value);
	if(e.keyCode == 13 || e.keyCode == 32) { // Enter || Space
		if(value != '') {
			createTag(value);
			this.value = '';
		}
		setTimeout(function() {
			taginput_el.value = '';
		}, 0)

	}
	if(e.keyCode == 8) {
		if(value == '') {
			deleteTag(tags_el.children[tags_el.children.length - 1])
		}
	}
	setTimeout(function() {
		taginput_el.value = capitalize(taginput_el.value);

		var textwidthchecker = document.querySelector('#textwidthchecker');
		textwidthchecker.textContent = taginput_el.value;

		taginput_el.style.width = (textwidthchecker.clientWidth + 20) + 'px';
	}, 0);
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