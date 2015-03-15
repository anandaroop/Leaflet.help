# Leaflet.help

A Leaflet control that helps users by displaying info on Leaflet's panning/zooming UI as well as other optional messages from the map creator. 

See the demo.

## How to use it

Leaflet.help integrates into your Leaflet map easily, has sensible defaults to work right out of the box, and has a few options for greater customization.

### Basic example

Leaflet.help can be added to your map with one simple config option passed to the L.Map constructor:

```javascript
var map = L.map('map', {
	helpControl: true
});
```

### Full example

Leaflet.help can also be customized before it is added to your map:

```javascript
var map = L.map('map').setView([40.69, -73.97], 16);

var help = L.control.help({
	// move the button to another corner
	position: 'topright',

	// change the button text from ? to i (in a bold italic serif face)
	text: '<span style="font-family: serif; font-weight: bold; font-style: italic">i</span>',

	// change the title of the help panel
	title: 'A customized title for the help panel',

	// insert some text at the top of the panel
	before: '<h1>About this map</h1><p>Here is some custom text. It\'s been inserted into the help panel <em>before</em> the instructions about panning and zooming.</p>',

	// insert some text at the bottom of the panel
	after: '<h1>Further reading</h1><p>Here is some more text. It\'s been inserted into the help panel <em>after</em> the instructions about panning and zooming.</p>',
});

help.addTo(map);
```
