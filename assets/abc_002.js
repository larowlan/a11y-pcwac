/**
 * @namespace
 * @description All general ABC methods and functionality should be placed
 *              within this namespace.
 * @version     0.0.4 Feb 2014
 * @author      ABC Innovation
 *
 */

var ABC = function() {

	var includeLocations = [];
	var onLoadFunctions = [getSubMenus, clearSearchField];

	var lastNav = null;
	var navTimer = null;


	loadIncludes(includeLocations);
	loadEvents(onLoadFunctions);

	/**
	 *	Iterate through an array of functions and call them onLoad
	 *
	 *	@param	{array}	functionArray	All functions to be called on load
	 */
	function loadEvents(functionArray) {
		for (var i=0;i < functionArray.length;i++) {
			addLoadEvent(functionArray[i]);
		}
	}

	/**
	 *	Run a specified function on load
	 *
	 *	@param	{function}	func	Function to be called
	 */
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				oldonload();
				func();
			};
		}
	}

	/**
	 *	Iterate through an array of file locations and write out an HTML script
	 *	tag for each one.
	 *
	 *	@param	{array}	includeArray	Array of file locations
	 */
	function loadIncludes(includeArray) {
		for (var i=0;i < includeArray.length;i++) {
			document.write('<scr' + 'ipt type="text/javascript" src="' + includeArray[i] + '"></scr' + 'ipt>');
		}
	}

	/**
	 * GLOBAL NAVIGATION SPECIFIC FUNCTIONS
	 */

	/**
	 *	Perform a HTTP request to retrieve the submenu html for the global nav
	 *	and attach it to the appropriate element.
	 *
	 *	@return void
	 */
	function getSubMenus() {
		// need to check active stylesheet!
		// don't get sub menus if handheld or iphone css

		var xmlhttp;
		var baseURL = 'http://' + location.host;
		var subMenus = baseURL + '/res/abc/submenus.htm';

		// find width of nav
		var navX = document.getElementById("abcNavWrapper");
		var navWidth;

		if (navX.currentStyle) {
			navWidth = parseInt(navX.currentStyle["width"]);
			//alert('currentStyle: width=' + navWidth);
		} else if (window.getComputedStyle) {
			navWidth = parseInt(document.defaultView.getComputedStyle(navX,null).getPropertyValue("width"));
			//alert('getComputedStyle: width=' + navWidth);
		}

		// could use instead:
		//var navWidth = document.getElementById("abcNavWrapper").offsetWidth;

		// download submenus for full-size screens
		if (navWidth >= 940) {
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE5, IE6
			} else {
				//alert("Your browser does not support XMLHTTP!");
			}

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 304))  {
					document.getElementById('abcNavMenu').innerHTML = xmlhttp.responseText;

					// after loading submenus
					addNavEvents();
					addLinkTracking();
				}
			};

			xmlhttp.open("GET",subMenus,true);
			xmlhttp.send(null);
		}
	}

	/**
	 *	Adds onmouseover and onmouseout events to top-level navs
	 *
	 *	@return void
	 */
	function addNavEvents() {
		var topNavs = document.getElementById('abcNavMenu').childNodes;

		for (var nodeN in topNavs) {
			if (topNavs[nodeN].nodeType == 1) {
				topNavs[nodeN].onmouseover = function() {
					showSubMenu(this);
				};
				topNavs[nodeN].onmouseout = function() {
					hideSubMenu(this);
				};
			}
		}
	}

	/**
	 *	show submenus of a top-level nav
	 *
	 *	@return void
	 */
	function showSubMenu(obj) {
		// show submenu if it exists
		if (obj && obj.firstChild && obj.firstChild.nextSibling) {
			if (obj.firstChild.nextSibling.nodeType == 1) {
				obj.firstChild.nextSibling.style.display = 'block'; // IE
			} else {
				obj.firstChild.nextSibling.nextSibling.style.display = 'block'; // DOM
			}
		}
		// clear timeout
		clearTimeout(navTimer);

		// hide last Nav immediately (if not same as current nav)
		if (ABC.lastNav != obj) {
			hideNav();
		}
	}

	/**
	 *	hide submenus of a top-level nav - after a 500 millisecond delay
	 *
	 *	@return void
	 */
	function hideSubMenu(obj) {
		ABC.lastNav = obj;
		navTimer = setTimeout('ABC.hideNav()',500);
	}

	/**
	 *	Hide submenus of a top-level nav - called by hideSubMenu after a delay
	 *
	 *	@return void
	 */
	function hideNav() {
		var obj = ABC.lastNav;

		// hide last submenu if it exists
		if (obj && obj.firstChild && obj.firstChild.nextSibling) {
			if (obj.firstChild.nextSibling.nodeType == 1) {
				obj.firstChild.nextSibling.style.display = 'none'; // IE
			} else {
				obj.firstChild.nextSibling.nextSibling.style.display = 'none'; // DOM
			}
		}
	}

	/**
	 *	Adds Webtrends link tracking to abcNav
	 *
	 *	@return void
	 */
	function addLinkTracking() {
		//if (document.getElementsByTagName('body')[0].className.indexOf('abcHomepage') != -1) {

			var navLinks = document.getElementById("abcNav").getElementsByTagName('A');
			var link;

			for (var i=0, j=navLinks.length; i<j; i++) {
				link = navLinks[i];
				link.onmouseup = function(){
					var parent = this.parentNode;
					var parentId = parent.id;

					// climb up tree until you find a parent with an id
					while (parentId === '') {
						parent = parent.parentNode;
						parentId = parent.id;
					}

					// find the current site profile
					var profile = 'other';
					if (typeof abcContentProfile != 'undefined') {
						profile = abcContentProfile;
					} else if (ABC.Stats && ABC.Stats.getProfile()) {
						profile = ABC.Stats.getProfile();
					}

					// add the webtrends query string
					if ((this.search.indexOf('WT.z_navMenu') == -1)) {
						this.search += (this.search == '') ? '?' : '&';
						this.search += 'WT.z_navMenu=' + parentId;
						this.search += '&WT.z_srcSite=' + profile;
						this.search += '&WT.z_linkName=' + (this.textContent || this.innerText).replace(/(?: & )|\s/gi, '_');
					}
				};
			}
		//}
	}

	/**
	 *	Toggle the search field in the top navigation to contain the holding
	 *	text of 'Keyword' unless in focus or filled with a value.
	 *
	 *	@return void
	 */
	function clearSearchField() {
		var searchBox = document.getElementById('abcNavQuery');
		var defaultText = 'Keywords';

		if (searchBox != null) {
			searchBox.onfocus = function() {
				if (this.value == defaultText) { this.value = ''; }
			};
			searchBox.onblur = function() {
				if (!this.value) { this.value = defaultText; }
			};
		}

		document.getElementById('abcNavSearch').onsubmit = function() {
			if ((searchBox.value == defaultText) || (searchBox.value == '')) {
				document.location.href = "http://search.abc.net.au/search/search.cgi?collection=abcall_meta";
				return false;
			}
		};
	}

	return {
		hideNav : function() {
			hideNav();
		},
		addLoadEvents : function(functionArray) {
			loadEvents(functionArray);
		}
	};
}();