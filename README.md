# Leaflet.help

A Leaflet control that helps users by displaying info on Leaflet's panning/zooming UI as well as other optional messages from the map creator. 

[See the demo](http://anandaroop.github.io/Leaflet.help).

Leaflet.help determines on the fly what panning and zooming handlers are available in its assigned map and displays instructions to the user accordingly, e.g. whether they can use keyboard shortcuts, scrollwheel zooms etc.

Leaflet.help can also be customized with additional messages that may appear before or after the UI instructions, so that it can act as a more general "about box" for the map.

## How to use it

Leaflet.help integrates into your map easily, has sensible defaults, and has a few options for greater customization.

### Include the assets

Import Leaflet.help's Javascript and CSS files into your html, somewhere after the Leaflet code itself.

```html
<!-- Leaflet -->
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css">
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

<!-- Leaflet.help -->
<link rel="stylesheet" href="/path/to/Leaflet.help.css">
<script src="/path/to/Leaflet.help.js"></script>
```

### Basic example

Leaflet.help can be added to your map with one simple config option passed to the map constructor:

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
	text: "<span style='font-family: serif; font-weight: bold; font-style: italic'>i</span>",

	// change the title of the help panel
	title: "A customized title for the help panel",

	// insert some text at the top of the panel
	before: "<h1>About this map</h1><p>Here is some custom text. It's been inserted into the help panel <em>before</em> the instructions about panning and zooming.</p>",

	// insert some text at the bottom of the panel
	after: "<h1>Further reading</h1><p>Here is some more text. It's been inserted into the help panel <em>after</em> the instructions about panning and zooming.</p>",
});

help.addTo(map);
```

### Customizing the design

Leaflet.help's appearance is specified almost entirely in CSS. Feel free to customize it for your purposes. A [SASS](http://sass-lang.com) source file is included in this repository, for easier generation of the CSS stylesheet.
