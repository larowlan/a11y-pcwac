
// prog a-z vars
var showall = 0;
var selActive = -1;
var downPress = -1;


$(document).ready(function(){

	//program search link fixer
$('.programsList .azList a').each(function() {
//match url pattern	for bad links
	var checkURL = $(this).attr('href');
	var pattern = new RegExp('http://www.abc.net.au/tv/guide/*');
	var endP = checkURL.indexOf("/programs/");
    var yearMonth = checkURL.substring(endP-6,endP);

	 // check url pattern and check the date was after the program page was released.
if (pattern.test(checkURL) && yearMonth > 201305) {
   //highlight links being rewritten $(this).css('color','#ff0000');

	if($(this).parent().hasClass('website')){
		var titleTxt = $(this).parent().parent().children('.programTitle').children('a').text();
	}
	else{
		var titleTxt = $(this).text();
	}

	if(titleTxt.match(/-/)){
		var firstH = titleTxt.indexOf(" - ");
		var titleTxt = titleTxt.slice(0,firstH);
	}
	else if (titleTxt.match(/\(/)){
		var firstH = titleTxt.indexOf(" (");
		var titleTxt = titleTxt.slice(0,firstH);
	}
	else{
	}

	var titleM = titleTxt.slice(0,3);
	var titleA = titleTxt.slice(0,2);

	if(titleM=='The'){
		var titleDir = (titleTxt.replace(/\'|\!|\:|\.|\/|\,|\"/g,'')).replace(/The /,'').replace(/ \+ /g,'-').replace(/ /g,'-').replace(/&/g,'and').replace(/ ,/g,'-').toLowerCase();
	}
	else if(titleA=='A '){
		var titleDir = (titleTxt.replace(/\'|\!|\:|\.|\/|\,|\"/g,'')).replace(/A /,'').replace(/ /g,'-').replace(/ \+ /g,'-').replace(/ ,/g,'-').replace(/&/g,'and').toLowerCase();
	}
	else{
		var titleDir = (titleTxt.replace(/'|\!|\:|\.|\/|\,|\"/g,'')).replace(/ \+ /g,'-').replace(/ /g,'-').replace(/&/g,'and').replace(/ ,/g,'-').toLowerCase();
	}

	var websiteURL = "http://www.abc.net.au/tv/programs/"+titleDir+"/";

	$(this).attr('href',websiteURL);
}

});

	// header module
	$("#prgAz").click(function () {
		$("#tvAzWrap").slideToggle("fast");
		$(this).toggleClass("upArrow").toggleClass("downArrow");
	});

	// hero modules
	$("#heroTabs .heroslide").each(function(i) {
		i++;
		$(this).attr('id','slide-'+i);
		$(this).children('.heroHidden1').attr('id','slideThumb'+i+'src');
		$(this).children('.heroHidden2').attr('id','slideThumb'+i+'copy');
	});

	if ($("#heroTabs").length) {
		var $herotabs =	$('#heroTabs').tabs({ fx: { opacity: 'toggle' } }).tabs('rotate', 10000);
	}
	$("#heroModule .heroGradient").show();
	$("#heroModule .heroPlay img").show();
	$("#heroModule .copyheroWrap").show();
	$("#heroModule .air").show();
	$("#heroModule h1").show();


	// hero thumbs populate
	$("#heroS1 img").attr('src',function() {return $("#slideThumb1src").html()});
	$("#heroS2 img").attr('src',function() {return $("#slideThumb2src").html()});
	$("#heroS3 img").attr('src',function() {return $("#slideThumb3src").html()});
	$("#heroS4 img").attr('src',function() {return $("#slideThumb4src").html()});
	$("#heroS1 span").html($('#slideThumb1copy').html());
	$("#heroS2 span").html($('#slideThumb2copy').html());
	$("#heroS3 span").html($('#slideThumb3copy').html());
	$("#heroS4 span").html($('#slideThumb4copy').html());

	// hero slide video play
	$(".heroPlayit").click(function () {
		$("#heroVidInner").fadeIn('slow', function() {
			showHeroVid();
		});
	});

	// hero close video on thumbs click
	$(".heroThumblinks").click(function () {hideHeroVid();});

	// hero rotation on mouse-over, mouse-out
	$("#heroModule").mouseover(function () {$('#heroTabs').tabs('rotate', null);return false;});
	$("#heroModule").mouseout(function () {$('#heroTabs').tabs('rotate', 10000);return false;});

	// promo rotator
	if ($("#fpPromoRotate").length) {showPromo()}

	// feature modules
	if ($("#featureModuleNav").length) {
		var $featuretabs = $('#featureModuleNav').tabs();
	}
	// update tab labels
	$("#featModh").html($('#ft1').html()); // non-tab general heading
	$("#ftabLabel-1").html($('#ft1').html());
	$("#ftabLabel-2").html($('#ft2').html());
	$("#ftabLabel-3").html($('#ft3').html());
	// show tab labels
	$("#uiTli1").slideDown("slow");
	$("#uiTli2").slideDown("slow");
	$("#uiTli3").slideDown("slow");



	// mini guide
	if ($("#miniGuide").length) {
		$.ajax({
			type: "GET",
			//url: "/tv/guide/abc1/netw/mini-epg-today.htm",
			url: "/tv/guide/abc1/netw/mini-epg-today-with-links.htm",
			dataType: "html",
			success: function(html) {miniGuide(html,'abc1');
			}
		});

		$.ajax({
			type: "GET",
			//url: "/tv/guide/abc2/netw/mini-epg-today.htm",
			url: "/tv/guide/abc2/netw/mini-epg-today-with-links.htm",
			dataType: "html",
			success: function(html) {miniGuide(html,'abc2');
			}
		});

		$.ajax({
			type: "GET",
			//url: "/tv/guide/abc3/netw/mini-epg-today.htm",
			url: "/tv/guide/abc3/netw/mini-epg-today-with-links.htm",
			dataType: "html",
			success: function(html) {miniGuide(html,'abc3');
			}
		});

		$.ajax({
			type: "GET",
			//url: "/tv/guide/abcnews24/netw/mini-epg-today.htm",
			url: "/tv/guide/abcnews24/netw/mini-epg-today-with-links.htm",
			dataType: "html",
			success: function(html) {miniGuide(html,'abc4');
			}
		});
	}


	// A-Z program index: /tv/programs/

	$("#progWrap table tr").each(function(e){
		var prgLink = $(this).find('a').html();
		prgLink = prgLink.substring(13,prgLink.length-1);
		// change program page to website link for certain programs
		switch (prgLink)
		{
		case 'rage':
		  prgLink="http://www.abc.net.au/rage";
		  break;
		case 'at-the-movies':
		  prgLink="http://www.abc.net.au/atthemovies";
		  break;
		case '730':
		  prgLink="http://www.abc.net.au/7.30";
		  break;
		case 'big-ideas':
		  prgLink="http://www.abc.net.au/tv/bigideas";
		  break;
		case 'qanda':
		  prgLink="http://www.abc.net.au/tv/qanda";
		  break;
		case 'catalyst':
		  prgLink="http://www.abc.net.au/catalyst";
		  break;
		case 'dirty-laundry':
		  prgLink="http://www.abc.net.au/tv/programs/dirty-laundry-live";
		  break;
		case 'media-watch':
		  prgLink="http://www.abc.net.au/mediawatch";
		  break;
		case 'compass':
		  prgLink="http://www.abc.net.au/compass";
		  break;
		case 'book-club':
		  prgLink="http://www.abc.net.au/tv/firsttuesday";
		  break;
		case 'good-game':
		  prgLink="http://www.abc.net.au/tv/goodgame";
		  break;
		case 'good-game-sp':
		  prgLink="http://www.abc.net.au/abc3/goodgamesp";
		  break;
		case 'gardening-australia':
		  prgLink="http://www.abc.net.au/gardening";
		  break;
		case 'australian-story':
		  prgLink="http://www.abc.net.au/austory";
		  break;
		case 'lateline':
		  prgLink="http://www.abc.net.au/lateline";
		  break;
		case 'behind-the-news':
		  prgLink="http://www.abc.net.au/btn";
		  break;
		case 'business':
		  prgLink="http://www.abc.net.au/news/programs/the-business";
		  break;
		case 'foreign-correspondent':
		  prgLink="http://www.abc.net.au/foreign";
		  break;
		case 'four-corners':
		  prgLink="http://www.abc.net.au/4corners";
		  break;
		case 'inside-business':
		  prgLink="http://www.abc.net.au/insidebusiness";
		  break;
		case 'insiders':
		  prgLink="http://www.abc.net.au/insiders";
		  break;
		case 'landline':
		  prgLink="http://www.abc.net.au/landline";
		  break;
		case 'offsiders':
		  prgLink="http://www.abc.net.au/sport/offsiders";
		  break;
		case 'drum':
		  prgLink="http://www.abc.net.au/news/abcnews24/programs/the-drum";
		  break;
		}

		var prgName = $(this).find('td').eq(0).html();
		$("#newList").append('<li><a href="'+prgLink+'">'+prgName+'</a></li>');
		/* additional search box filer list disabled */
		//$("#filterListA").append('<li><a href="'+prgLink+'">'+prgName+'</a></li>');
	});


	//only do this on program landing page az not funnelback search
	if ($('body#tvPrograms').hasClass('landing')){
		if (window.location.hash) {
			var filterLetter = window.location.hash.charAt(1);
			if (window.location.hash.length == 2) {
				filterLetter = filterLetter.toLowerCase();
				setTimeout(function(){
				$('.programAZ #'+filterLetter+' a').click();
				}, 700);
			} else {
				if ((window.location.hash == '#showall')||(window.location.hash == '#shownum')) {
					setTimeout(function(){
					$('.programAZ #showall a').click();
					}, 700);
				}
			}
		}
	}




	$("#clearForm").click(function(e) {
		$("#search_input").val('');
		$('#newList').hide();
		$('#newListb').html('');
		return false;
	});

	if ($('body#tvPrograms').hasClass('landing')){
		$("#tvPrograms .programAZ li,#tvPrograms #tvAzWrap li,#tvPrograms #prgShowAll").click(function(c) {
			var whatItem = $(this).text();
			if ((whatItem != "SHOW ALL")&&(whatItem != "#")&&(whatItem != "Show All")) {
				$("#search_input").val(whatItem);
				var e = jQuery.Event("keydown");
				e.which = 39; // right arrow key
				$("#search_input").trigger(e);
				window.location.hash = whatItem;
			} else { // show all
				$("#search_input").val('');
				$('#newList').show();
				$('#newList li').show();
				$('#mainContent #newList li').removeClass('color','#3DADD4');
			}
			return false;
		});
	}

	$(function() {
		$('#search_input').fastLiveFilter('#newList','',1);
	});


	// search box filter list disabled
	/*
	$(function() {
		$('#inBox').fastLiveFilter('#filterListA','','box');
	});
	*/

	$('#inBox').focus(function() {
		var e = jQuery.Event("keydown");
		e.which = 40; // down arrow key
		$("#search_input").trigger(e);
	});





// end ready
});


// mini guide
function miniGuide(html,whatChan) {
	var dateNow = new Date ();
	var hour = dateNow.getHours ();
	var mins = dateNow.getMinutes ();
	var hour1 = Math.floor ( hour / 10 );
	var hour2 = hour % 10;
	var mins1 = Math.floor ( mins / 10 );
	var mins2 = mins % 10;
	hourNow = hour1.toString() + hour2.toString();
	hourNow = parseInt(hourNow,10);
	minNow = mins1.toString() + mins2.toString();
	// if earlier than 4:30am (now 6am), we are at end of guide day so add 24
	if (hourNow<6) {hourNow+=24;}
	//if ((hourNow==4)&&(minNow<30)) {hourNow+=24;}
	$(html).children('.itemTitle').each(function(index,domEle){
		var epgName = $(this).html();
		var epgTime = $(this).siblings('.itemTime').html();
		var epgNextName = $(this).parent().next().children('.itemTitle').html();
		var epgNextTime = $(this).parent().next().children('.itemTime').html();
		var foundColon = epgTime.indexOf(":");
		var foundPm = epgTime.indexOf("pm");
		var hourInCell = epgTime.substring(0,foundColon);
		var minInCell = epgTime.substring(foundColon+1,foundColon+3);
		hourInCell = parseInt(hourInCell);
		if ((foundPm!=-1)&&(hourInCell!=12)) {hourInCell+=12}else{if ((foundPm==-1)&&(hourInCell==12)){hourInCell-=12}}
		// if hour is less than 4 (now 6) and loop is more than 8 programs in
		if ((hourInCell<=6)&&(index>8)) {hourInCell+=24;}
		if (hourInCell==hourNow) {
			if (minNow>=minInCell) {
				$("#miniP"+whatChan+"a").html(epgName);
				$("#miniT"+whatChan+"a").html(epgTime+":");
				if (epgNextName) {$("#miniP"+whatChan+"b").html(epgNextName);}else{$("#miniP"+whatChan+"b").html('Zzzzzz');};
				if (epgNextTime) {$("#miniT"+whatChan+"b").html(epgNextTime+":");}else{$("#miniT"+whatChan+"b").html('');};
			}
		} else {
			if (hourInCell<hourNow) {
				$("#miniP"+whatChan+"a").html(epgName);
				$("#miniT"+whatChan+"a").html(epgTime+":");
				if (epgNextName) {$("#miniP"+whatChan+"b").html(epgNextName+":");}else{$("#miniP"+whatChan+"b").html('Zzzzzz');};
				if (epgNextTime) {$("#miniT"+whatChan+"b").html(epgNextTime+":");}else{$("#miniT"+whatChan+"b").html('');};
			}
		}
	});
	// update promo on fp
	$("#promoAbcnewsNow").html($('#miniTabc4a').html()+" AEST "+$('#miniPabc4a').html());
	$("#promoAbcnewsNext").html($('#miniTabc4b').html()+" AEST "+$('#miniPabc4b').html());
}

// hero module functions
function hideHeroVid() {
	var vidDiv = $("#heroVidPlayer").html();
	if (vidDiv.length > 0) { // if there's an open video
		cinerama.pauseVideo('heroVidPlayer');
		cinerama.hideAllPlayers();
	};
	$("#heroCloseWrap").hide();
	$("#heroVidInner").fadeOut('fast', function() {
		$("#heroVid").fadeOut('fast');
	});
}

function showHeroVid() {
	$("#heroVid").fadeIn('slow', function() {
		$("#heroVidPlayer").show();
		$("#heroCloseWrap").show({
    complete: function() {
      // Focus for keyboard users.
      setTimeout(function() {
        $("#heroClose").focus();
      }, 300);
    }});
	});
}


// promo rotator
function showPromo() {
	// If there are hidden divs left
	if($('#fpPromoRotate div:hidden').size() > 0) {
		// Fade the first of them in
		$('#fpPromoRotate div:hidden:first').fadeIn("slow");
		// And wait one second before fading in the next one
		setTimeout(showPromo, 6000);
	}
	else if($('#fpPromoRotate div:hidden').size() == 0){
		$("#promo1").hide();
		$("#promo2").hide();
		$("#promo3").fadeOut("slow");
		showPromo();
	}
}


// TV Guide
var timeDistance = 0;

function tvGuide() {
	// format TV Guide
	if ($("#tvGuide").length) {
		processChannel("epgAbc1");
		processChannel("epgAbc2");
		processChannel('epgAbc3');
		processChannel('epgAbc4');
	}
	// channel pages
	if ($("#tvABC1").length) {processChannel("epgAbc1");}
	if ($("#tvABC2").length) {processChannel("epgAbc2");}
	if ($("#tvABCNews").length) {processChannel("epgAbcNews");}

	// go to 'now' onload (if cookie not found)
	var thebackCookie = $.cookie('backtoGuide');
	if (thebackCookie == null) {
		$("#epgInnerWrap").scrollTo(timeDistance-160+'px',0,{axis:'x'});
	} else {// scroll to last known item then delete cookie
		var theProgramItem = $('#' + thebackCookie);
		if (theProgramItem.length > 0){// if item exists
			theProgramItem = theProgramItem.parent().parent();
			var nearestTime = theProgramItem.position().left;
			$("#epgInnerWrap").scrollTo(nearestTime-120+'px',0,{axis:'x'});
			//theProgramItem.addClass('selectedProgram');
		}
		$.cookie('backtoGuide', null);
	}
	// move marker to current time
	$("#marker").css('left', timeDistance+8);
}


function processChannel(chName) {
	// time now
	var dateNow = new Date ();
	var hour = dateNow.getHours ();
	var mins = dateNow.getMinutes ();
	var hour1 = Math.floor ( hour / 10 );
	var hour2 = hour % 10;
	var mins1 = Math.floor ( mins / 10 );
	var mins2 = mins % 10;
	hourNow = hour1.toString() + hour2.toString();
	hourNow = parseInt(hourNow,10);
	minNow = mins1.toString() + mins2.toString();
	minNow = parseInt(minNow);
	// make array out of all itemTime spans
	var contElement = document.getElementById(chName);
	var arrayItemTimes = getElementsByClassName('itemRealTime', 'span',contElement);
	var arrayItemTimeDist = new Array(); // minutes from midnight of first day
	var arrayItemDuration = new Array(); // duration of each item in minutes
	var i = 0;
	var d = 0;
	var w = 0;
	var liWidth = 0;
	var lastLi = arrayItemTimes.length-2;
	var startOffset = 0;
	var hourInCell = 0;
	var minInCell = 0;
	for (i = 0; i < arrayItemTimes.length; i++) {
		var liTime = arrayItemTimes[i].innerHTML;
		foundDot = liTime.indexOf(":");
		foundPm = liTime.indexOf("pm");
		// create array of each number before colon
		hourInCell = liTime.substring(0,foundDot);
		minInCell = liTime.substring(foundDot+1,foundDot+3);
		hourInCell = parseInt(hourInCell);
		minInCell = parseInt(minInCell,10);
		if ((foundPm!=-1)&&(hourInCell!=12)) {hourInCell+=12}else{if ((foundPm==-1)&&(hourInCell==12)){hourInCell-=12}}
		// if hour is less than 6 and loop is more than 8 programs in (to find distance from midnight on first day)
		if ((hourInCell<=6)&&(i>8)) {hourInCell+=24;}
		arrayItemTimeDist[i] = (hourInCell*60+minInCell);
		// check if first program starts after 4:30am (now 6am)
		if (i==0) {startOffset = ((hourInCell*60+minInCell)-360)*8;}
	}
	// find duration of each item in minutes by subtracting previous item
	for (d = 0; d < (arrayItemTimes.length - 1); d++) {
		var prB = arrayItemTimeDist[d+1];
		var prA = arrayItemTimeDist[d];
		if (prB > prA) {
			arrayItemDuration[d] = arrayItemTimeDist[d+1] - arrayItemTimeDist[d];
		} else {
			arrayItemDuration[d] = 3;
		}
	}

	// convert time now to time distance from 430am (now from 6am)
	if (hourNow<6) {hourNow+=24;} // if earlier than 4am, we are at end of day not beginning so add 24
	timeDistance = ((hourNow*60+minNow)-360); // 360 is minutes from midnight to 6:00am
	timeDistance = ((timeDistance*8)-5);

	// change li width to match duration
	for (w = 0; w < arrayItemTimes.length-1; w++) {
		liWidth = arrayItemDuration[w]*8-5; // times 8 pixels, minus offset of 5 pixels (li padding)
		if ((liWidth>=3)&&(liWidth<27)) { // add info 'i' link in place of title for 1,2,3 min programs
			smallContent = arrayItemTimes[w];
			smallContent = $(smallContent).closest('li');
			$(smallContent).css('padding','0px');
			liWidth+=5;
			var newdiv = document.createElement('a');
			newdiv.className = "infoa";
			newdiv.innerHTML = 'i';
			newdiv.href = $(smallContent).find('a').attr('href');
			$(smallContent).find('span').not('.itemTitle').hide();
			$(smallContent).find('.itemTitle a').not('.infoa').hide();
			$(smallContent).find('.itemTitle').append(newdiv);
		}
		if (liWidth==27) { // adjust padding for 4 min programs
			smallContent = arrayItemTimes[w];
			smallContent = $(smallContent).closest('li');
			$(smallContent).css('padding','1px');
			liWidth+=4;
		}
		if (liWidth==35) { // adjust padding for 5 min programs
			smallContent = arrayItemTimes[w];
			smallContent = $(smallContent).closest('li');
			$(smallContent).css('padding','2px');
			liWidth+=3;
		}
		var normalContent = arrayItemTimes[w];
		var firstContent = arrayItemTimes[0];
		if (w==0) {
			// add margin to first program
			firstContent = $(firstContent).closest('li');
			startOffset = startOffset+'px';
			$(firstContent).css('margin-left',startOffset);
		}
		normalContent = $(normalContent).closest('li');
		liWidth = liWidth+'px';
		$(normalContent).css('width',liWidth);
	}
}


// generic get by class name (legacy, can be removed if using jquery)
function getElementsByClassName(strClass, strTag, objContElm) {
  strTag = strTag || "*";
  objContElm = objContElm || document;
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';
  var arrClass = strClass.split(delim);
  for (var i = 0, j = objColl.length; i < j; i++) {
    var arrObjClass = objColl[i].className.split(' ');
    if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
    var c = 0;
    comparisonLoop:
    for (var k = 0, l = arrObjClass.length; k < l; k++) {
      for (var m = 0, n = arrClass.length; m < n; m++) {
        if (arrClass[m] == arrObjClass[k]) c++;
        if ((delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
          arr.push(objColl[i]);
          break comparisonLoop;
        }
      }
    }
  }
  return arr;
}


String.prototype.between = function(prefix, suffix) {
	s = this;
	var i = s.indexOf(prefix);
	if (i >= 0) {s = s.substring(i + prefix.length);}
else {return '';}
if (suffix) {
	i = s.indexOf(suffix);
	if (i >= 0) {s = s.substring(0, i);}
	else {return '';}
}
return s;
}



// plugins
// jQuery.ScrollTo 1.4.2 - flesler.blogspot.com
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

// cookie plugin: Klaus Hartl (stilbuero.de)
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};





// sort plugin (for program a-z list, modified by ABC to suit purpose)

/**
 * fastLiveFilter jQuery plugin 1.0.3
 * Copyright (c) 2011, Anthony Bush
 * License: <http://www.opensource.org/licenses/bsd-license.php>
 * Project Website: http://anthonybush.com/projects/jquery_fast_live_filter/
 **/

jQuery.fn.fastLiveFilter = function(list, options,custom) {
	// Options: input, list, timeout, callback
	options = options || {};
	list = jQuery(list);
	var input = this;
	var timeout = options.timeout || 0;
	var callback = options.callback || function() {};

	var keyTimeout;

	var lis = list.children();
	var len = lis.length;
	var oldDisplay = len > 0 ? lis[0].style.display : "block";
	callback(len);
	input.change(function() {
		if (custom != 'box') {
			$('#newList').show();
			$("#newListb").html('');
		} else {
			// search box filter list disabled
			// $('#keywordResults').show();
			//$('#filterListA').show();
			$("#filterListB").html('');
		}
		var filter = input.val().toLowerCase();
		var li;
		var liText;
		var liLink;
		var numShown = 0;
		for (var i = 0; i < len; i++) {
			li = lis[i];
			liText = $(li).text();
			liLink = $(li).html();
			if (filter.length == 1) {
				// if first letter match
				if (liText.toLowerCase().charAt(0) == filter) {
					if (li.style.display == "none") {
						li.style.display = oldDisplay;
					}
					numShown++;
				} else {
					if (li.style.display != "none") {
						li.style.display = "none";
					}
				}
			};
			if (filter.length == 2) {
				// if first, second letter match
				if (liText.toLowerCase().substring(0, 2) == filter) {
					if (li.style.display == "none") {
						li.style.display = oldDisplay;
					}
					numShown++;
				} else {
					if (li.style.display != "none") {
						li.style.display = "none";
					}
				}
			};
			if (filter.length > 2) {
				// if filter matches first letters of program
				if (liText.toLowerCase().substring(0, filter.length) == filter) {
					if (li.style.display == "none") {li.style.display = oldDisplay;}
					numShown++;
				} else {
					var tmpPos = liText.toLowerCase().indexOf(filter);
					// regex: whole word: /\bstring\b/ig
					var wholeWord = new RegExp('\\b'+filter+'\\b','ig');
					var wordTypeWhole = liText.search(wholeWord);
					// if any match and is part of a word, put in second list
					if ((tmpPos >= 0)&&(wordTypeWhole < 0)) {
						if (li.style.display != "none") {li.style.display = "none";}
						if (custom != 'box') {
							$("#newListb").append('<li>'+liLink+'</li>');
						} else {
							$("#filterListB").append('<li>'+liLink+'</li>');
						}
					} else
						// if any match and IS a whole word
						if ((tmpPos >= 0)&&(wordTypeWhole >= 0)) {
							if (li.style.display == "none") {
								li.style.display = oldDisplay;
							}
							numShown++;
					} else {
						if (li.style.display != "none") {li.style.display = "none";}
					}
				};
			};
			if (filter.length == 0) {
				// blank, show all
				li.style.display = "none";
				if (custom != 'box') {
					$("#newListb").html('');
				} else {
					$("#filterListB").html('');
					//$('#keywordResults').hide();
				}
			};
		};
		callback(numShown);
		// console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + ' (' + numShown + ' results)');
		return false;
	}).keydown(function() {
		clearTimeout(keyTimeout);
		keyTimeout = setTimeout(function() { input.change(); }, timeout);
	});
	return this;
}
