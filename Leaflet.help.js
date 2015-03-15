L.Control.Help = L.Control.extend({
	options: {
		position: 'topleft',
		text: '?',
		title: 'How to use this map'
	},

	statics: {
		STRINGS: {
			zoom: {
				touch: "Double-tap the touchscreen anywhere on the map to zoom in; use the zoom and punch gestures to zoom in and out.",
				dblclick: "Double-click anywhere on the map to zoom in. Shift-double-click to zoom out.",
				box: "Shift-click to draw a rectangular area to zoom into.",
				keyboard: "Use the + and - keys on your keyboard to zoom in and out.",
				scrollwheel: "Use your mouse's scrollwheel or your trackpad's scroll gesture (e.g. two-finger swipe).",
				zoomcontrol: "Use the + and - buttons on the map to zoom in and out.",
			},
			pan: {
				touch: "Swipe the map on your touchscreen.",
				drag: "Click and drag anywhere on the map, or use your trackpad's drag gesture.",
				keyboard: "Use the arrow keys on your keyboard.",
			}
		}		
	},

	active: false,
	transitioning: false,

	// insert control UI
	onAdd: function(map) {
		var container = L.DomUtil.create('div', 'leaflet-control-help leaflet-control leaflet-bar');

		this._button = L.DomUtil.create('a', 'leaflet-control-help-button leaflet-bar-part', container);
		this._button.href = '#';
		this._button.title = this.options.title;
		this._button.innerHTML = this.options.text;
		this._map = map;

		L.DomEvent.addListener(this._button, 'click', this._click, this);

		return container;
	},

	// onRemove: function(map) {
	// },

	_click: function(e) {
		if (this.active) {
			this._hide();
		} else if (!this.transitioning) {
			this._show();
		}
	},

	_available_zooms: function() {
		var zooms = [];

		if (this._map.options.touchZoom){
			zooms.push('touch');
		}
		if (this._map.options.keyboard){
			zooms.push('keyboard');
		}
		if (this._map.options.doubleClickZoom){
			zooms.push('dblclick');
		}
		if (this._map.options.scrollWheelZoom){
			zooms.push('scrollwheel');
		}
		if (this._map.options.zoomControl){
			zooms.push('zoomcontrol');
		}
		if (this._map.options.boxZoom){
			zooms.push('box');
		}

		return zooms;
	},

	_available_pans: function() {
		var pans = [];

		if (this._map.options.touchZoom){
			pans.push('touch');
		}
		if (this._map.options.keyboard){
			pans.push('keyboard');
		}
		if (this._map.options.dragging){
			pans.push('drag');
		}

		return pans;
	},

	_show: function() {

		// create DOM elements
		this._panel = L.DomUtil.create('aside', 'help-panel pending', this._map.getContainer());
		var close = L.DomUtil.create('a', 'close', this._panel);
		close.href = '#';
		close.title = 'Close';
		close.innerHTML = '✕';

		// insert content
		var pans = this._available_pans();
		var zooms = this._available_zooms();
		this._panel.innerHTML += '<div>' + 
		'<p class="title">' + this.options.title + '</p class="title">' + 
		(this.options.before ? this.options.before : '') + 
		'<h1>To pan around the map</h1>' + 
		'<ul>' + 
		pans.map(function(p){ return '<li>' + L.Control.Help.STRINGS.pan[p] + '</li>'; }).join('') + 
		'</ul>' +
		'<h1>To zoom in and out of the map</h1>' + 
		'<ul>' +
		zooms.map(function(z){ return '<li>' + L.Control.Help.STRINGS.zoom[z] + '</li>'; }).join('') + 
		'</ul>' +
		(this.options.after ? this.options.after : '') + 
		'</div>'
		;

		// handle close button
		var close = (document.getElementById('map-container').getElementsByClassName('help-panel')[0].getElementsByClassName('close')[0]);
		L.DomEvent.on(close, 'click', this._hide, this);

		// reveal (force teensy delay on css transition)
		var that = this;
		setTimeout(function(){
			if (that._panel) {
				that._panel.classList.remove('pending');
			}
		}, 1)
		this.active = true;
	},

	_hide: function() {
		// begin the dismissal transition by adding the 'dismissed' style 
		this._panel.classList.add('dismissed');
		this.transitioning = true;
		this.active = false;

		// account for transition duration before removing from DOM
		var that = this;
		setTimeout(function(){
			if (that._panel) {
				that._map.getContainer().removeChild(that._panel);
				that.transitioning = false;
			}
		}, 150)
	}

});

// init hook for Map
L.Map.addInitHook(function(){
	// if Map creation options includes {helpControl: true} 
	// then instantiate a default help control 
	if (this.options.helpControl) {
		this.addControl(L.control.help());
	}
})

// factory method
L.control.help = function (options) {
	return new L.Control.Help(options);
};
