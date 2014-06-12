/**
 * @namespace	ABC.Stats
 * @description Assigns a stats profile based on server and top-level domain, and loads the appropriate webtrends.load.profile script.
 * @version 	October 2013
 * @author 		Geoff Pack
 *
 */

var ABC = ABC || {};

ABC.Stats = function() {
	var host = location.host;
	var directories = location.pathname.split('/');
	var dev = ((host == 'localhost.abc.net.au') || (host == 'nmdev.abc.net.au') || (host == 'wwwdev.abc.net.au') || (host == 'project.abc.net.au')) ? true : false;
	var profile = null;

	if (host.indexOf('www.') == 0) host = host.substring(4); // strip leading www.

	// set profile
	switch (host) {
		case 'search.abc.net.au':
			profile = 'other';
			if (/collection=ABC_TV&form=programs/.test(location.search)) {
				profile = 'tv';
			}
			break;

		case 'abctv.net.au':
			profile = 'tv';
			if (directories[1] == 'abc3') {
				profile = 'abc3'; // should catch 'abctv.net.au/abc3/'
			}
			break;

		case 'about.abc.net.au':
		case 'arts.abc.net.au':			profile = 'other'; break;

		case 'collectorsshowandtell.abc.net.au':
		case 'cnnnn.com':
		case 'openingshot.abc.net.au':
		case 'summerheightshigh.com':
		case 'thepuredrop.com.au':
		case 'thestrangecalls.abc.net.au':	profile = 'tv'; break;

		case 'iview.abc.net.au':		profile = 'iview'; break;

		case 'pool.abc.net.au':
		case 'radionational.net.au':
		case 'blogs.radionational.net.au':
		case 'style.radionational.net.au':
		case 'kerriejean.com.au':  		profile = 'rn'; break;

		case 'triplej.abc.net.au':
		case 'triplej.net.au':
		case 'triplej.yourevents.com.au':
		case 'triplejawol.typepad.com':
		case 'triplejgadget.abc.net.au':
		case 'triplejunearthed.com':
		case 'triplejunearthed.com.au':	profile = 'triplej'; break;

		case 'digmusic.net.au':			profile = 'digmusic'; break;

		case 'abcdigmusic.net.au':
		case 'abcjazz.net.au':
		case 'abccountry.net.au':		profile = 'dig'; break;

		case 'radioaustralia.net.au':
		case 'khmer.radioaustralia.net.au':
		case 'blogs.radioaustralia.net.au':
		case 'rantang.com.au':
		case 'rantang.net.au':
		case 'bayvut.com.au':
		case '24hdanslepacifique.com': 	profile = 'radioaustralia'; break;

		case 'australianetwork.com': 	profile = 'australianetwork'; break;

		case 'heywire.abc.net.au': 		profile = 'local'; break;

		case 'shop.abc.net.au':			profile = 'shop'; break;

		case 'abccommercial.com.au':
		case 'abccontentsales.com.au':
		case 'abccostumes.com.au':
		case 'abcmusicpublishing.com.au':
		case 'countdown.com.au':
		case 'organicgardener.com.au': 	profile = 'commercial'; break;

		case 'myabcforkids.abc.net.au': profile = 'kids'; break;

		case 'abc3quiz.abc.net.au':
		case 'cjthedj.abc.net.au':
		case 'club3.abc.net.au':
		case 'prankpatrol.abc.net.au':
		case 'staytuned.abc.net.au':
		case 'zimmertwins.com.au': 		profile = 'abc3'; break;

		case 'exploretheseafloor.net.au':
		case 'scienceweek.info.au':
		case 'sleepsurvey.net.au':
		case 'starhunt.net.au':
		case 'nationalmemorytest.net.au':
		case 'multitaskingtest.net.au': profile = 'science'; break;

		case 'fantasycricket.abc.net.au':
		case 'tipping.abc.net.au': 		profile = 'grandstand'; break;

		case 'livenews.abc.net.au':
		case 'campaignpulse.abc.net.au': profile = 'news'; break;

		case 'roadtrip.abcopen.net.au':
		case 'open.abc.net.au': 		profile = 'open'; break;

		case 'splashlive.abc.net.au':
		case 'zoom.abc.net.au':
		case 'splash.abc.net.au': 		profile = 'splash'; break;

		case 'theoperahouseproject.com': 	profile = 'soh'; break;

		case 'spoke.abc.net.au': 		profile = 'spoke'; break;

		case 'blogs.abc.net.au':
			switch (directories[1]) {

				// australia network
				case 'achievers':
				case 'learnenglish': 	profile = 'australianetwork'; break;

				// dig
				case 'dig': 			profile = 'dig'; break;

				// local
				case 'local':
				case 'localradio':
				case 'active':
				case 'australiaallover':
				case 'canberra':
				case 'greenarmy':
				case 'heywire':
				case 'inmotion':
				case 'lrawards':
				case 'nsw':
				case 'nt':
				case 'queensland':
				case 'rural':
				case 'sa':
				case 'tasmania':
				case 'victoria':
				case 'wa':				profile = 'local'; break;

				// news
				case 'allpoints':
				case 'annabelcrabb':
				case 'antonygreen':
				case 'articulate':
				case 'dispatches':
				case 'drumroll':
				case 'events':
				case 'news':
				case 'newseditors':
				case 'offair':
				case 'thebuzz':
				case 'thepollvault':
				case 'theshallowend':
				case 'thesportsdesk':
				case 'weatherman': 		profile = 'news'; break;

				// current affairs
				case 'theoverflow': 	profile = 'currentaffairs'; break;

				// ra
				case 'breakfastclub':
				case 'radioaustralia':
				case 'vietnamese': 		profile = 'radioaustralia'; break;

				// rn
				case 'allinthemind':
				case 'chinese':
				case 'radionational':
				case 'religion':
				case 'saturdayextra': 	profile = 'rn'; break;

				// science
				case 'the_green_room': 	profile = 'science'; break;

				// health
				case 'livingit': 	profile = 'health'; break;

				// triple j
				case 'triplej':
				case 'triplejawol': 	profile = 'triplej'; break;

				// tv
				case 'abc_tv':
				case 'catalyst':
				case 'chaser':
				case 'fangingit':
				case 'goodgame':
				case 'lifeat2':
				case 'parenting': 		profile = 'tv'; break;

				// grandstand
				case 'gerardwhateley':
				case 'grandstand':
				case 'sport':
				case 'active':
				case 'worldcup': 		profile = 'grandstand'; break;

				// other
				default: profile = 'other';
			}
			break;

		case 'www2b.abc.net.au':
			switch (directories[1]) {

				// innovation
				case 'EventCentral':	profile = 'innovation'; break;

				// science
				case 'science':			profile = 'science'; break;
				case 'nature':
				case 'aceday':
				case 'catapult':		profile = 'science'; break;

				// health
				case 'health':			profile = 'health'; break;

				// arts
				case 'arts':
				case 'postcode':		profile = 'other'; break;

				// religion and ethics
				case 'religion':		profile = 'other'; break;

				// news
				case 'btn':
				case 'elections':
				case 'Elections':
				case 'netball':
				case 'news':			profile = 'news'; break;

				// current affairs
				case 'austory':
				case 'foreign':
				case 'landline':
				case 'lateline':		profile = 'currentaffairs'; break;

				// tv sites that do not redirect to /tv/...
				case 'atthemovies':
				case 'chaser':
				case 'cnnnn':
				case 'compass':
				case 'doublethefist':
				case 'enoughrope':
				case 'fedsquare':
				case 'firsttuesday':
				case 'gardening':
				case 'kathandkim':
				case 'loveletters':
				case 'myfavouritealbum':
				case 'myfavouritefilm':
				case 'newinventors':
				case 'rage':
				case 'schoolstv':
				case 'tvpublicity':
				case 'wildwatch':
				case 'tv':				profile = 'tv'; break;

				// rn
				case 'counterpoint':
				case 'singersofrenown':
				case 'rn':				profile = 'rn'; break;

				// dig
				case 'dig': 			profile = 'dig'; break;

				//triplej
				case 'triplej':			profile = 'triplej'; break;

				// radio australia
				case 'ra':				profile = 'radioaustralia'; break;

				// local
				case 'australiaallover':
				case 'backyard':
				case 'contact':
				case 'heywire':
				case 'overnights':
				case 'rural':
				case 'sundaynights':
				case 'victoria':  		profile = 'local'; break;

				// corporate
				case 'corp':			profile = 'other'; break;

				// kids
				case 'children': 		profile = 'kids'; break;

				// abc3
				case 'abc3':
				case 'chiko':
				case 'rollercoaster':	profile = 'abc3'; break;

				// indigenous
				case 'message':
				case 'messageclub':
				case 'missionvoices': 	profile = 'indigenous'; break;

				// grandstand
				case 'tennis': 			profile = 'grandstand'; break;

				// message boards
				case 'tmb':
					if (directories[2] == 'Client') {
						// find the board number
						var tmbBoardNumber = /b=[0-9]+/.exec(location.search);
						tmbBoardNumber = tmbBoardNumber[0].substring(2);

						switch (tmbBoardNumber) {

							case '32':
							case '86': 	profile = 'other'; break;

							case '11': 	profile = 'australianetwork'; break;

							case '88': 	profile = 'classicfm'; break;

							case '65': 	profile = 'commercial'; break;

							case '21':
							case '27':
							case '37':
							case '55':
							case '56':
							case '100': profile = 'currentaffairs'; break;

							case '45': 	profile = 'dig'; break;

							case '66':
							case '106': profile = 'grandstand'; break;

							case '79':
							case '85': 	profile = 'health'; break;

							case '14':
							case '22':
							case '115':
							case '118': profile = 'indigenous'; break;

							case '62':
							case '98':
							case '112': profile = 'innovation'; break;

							case '4':
							case '7':
							case '9':
							case '10':
							case '12':
							case '15':
							case '16':
							case '23':
							case '29':
							case '48':
							case '49':
							case '54':
							case '58':
							case '74':
							case '75':
							case '78':
							case '84':
							case '92':
							case '97':
							case '101': profile = 'local'; break;

							case '31':
							case '35':
							case '36':
							case '47':
							case '67':
							case '69':
							case '93':
							case '94':
							case '103':
							case '104': profile = 'news'; break;

							case '34':
							case '73':
							case '77': 	profile = 'radioaustralia'; break;

							case '5':
							case '17':
							case '30':
							case '44':
							case '119': profile = 'rn'; break;

							case '2':
							case '6':
							case '50':
							case '142':
							case '210':
							case '238':
							case '250': profile = 'abc3'; break;

							case '52':
							case '80':
							case '96':
							case '109':
							case '120':
							case '282': profile = 'science'; break;

							case '3':
							case '99':
							case '105': profile = 'triplej'; break;

							case '8':
							case '13':
							case '19':
							case '20':
							case '24':
							case '25':
							case '26':
							case '28':
							case '33':
							case '51':
							case '57':
							case '59':
							case '63':
							case '64':
							case '70':
							case '71':
							case '72':
							case '76':
							case '81':
							case '82':
							case '83':
							case '87':
							case '89':
							case '90':
							case '102':
							case '108':
							case '113':
							case '114':
							case '116':
							case '117': profile = 'tv'; break;

							default: profile = 'other';
						}
					}
					break;

				// vote central
				case 'votecentral':
					if (directories[2] == 'Client') {
						// find the event number
						var eventNumber = /E=[0-9]+/.exec(location.search);
						eventNumber = eventNumber[0].substring(2);

						switch (eventNumber) {
							case '97': profile = 'triplej'; break;

							default: profile = 'other';
						}
					}
					break;

				default: profile = 'other';
			}
			break;

		// all other servers should resolve to www or have the same directory structure (e.g. dev servers)

		default:
			switch (directories[1]) {

				// abc online / front-page
				case '':
				case 'default.htm':
				case 'default_b.htm':
				case 'default_800.htm':
				case 'homepage':
				case 'services':		profile = 'homepage'; break;

				// abc online / front-page profile
				case 'communities':
				case 'copyright.htm':
				case 'privacy.htm':
				case 'conditions.htm':
				case 'topics.htm':
				case 'help':			profile = 'other'; break;

				// innovation
				case 'innovation':
				case 'bestof':
				case 'earth':
				case 'mobile':
				case 'thebigdiary':
				case 'upload':			profile = 'innovation'; break;

				case 'now':				profile = 'now'; break;

				case 'playback':
				case 'playback_':		profile = 'playback'; break;

				case 'disability':
				case 'rampup':			profile = 'disability'; break;

				// science
				case 'science':
				case 'labnotes':
				case 'greenatwork':
				case 'dinosaurs':
				case 'beasts':
				case 'acedayjobs':
				case 'catapult':		profile = 'science'; break;

				// health
				case 'health':			profile = 'health'; break;

				// portals
				case 'arts':
				case 'environment':
				case 'religion':
				case 'technology':		profile = 'portal'; break;


				// polls
				case 'polls':
					profile = 'other';
					if (directories[2] == 'thedrum') {
						profile = 'news';  // should catch '/polls/thedrum'
					}
					break;

				// news
				case 'news':
					profile = 'news';
					if (directories[2] == 'emergency') {
						profile = 'local';  // should catch '/news/emergency'
					}
					if (directories[2] == 'breakfast') {
						profile = 'currentaffairs';  // should catch '/news/breakfast'
					}
					break;

				// other news
				case 'btn':
				case 'elections':
				case 'netball':
				case 'olympics':
				case 'thedrum':
				case 'unleashed':
				case 'winterolympics':
				case 'worldcup':
				case 'worldcup2002':	profile = 'news'; break;

				// current affairs
				case '4corners':
				case '7.30':
				case 'am':
				case 'aroundtheworld':
				case 'austory':
				case 'australiawide':
				case 'businessbreakfast':
				case 'correspondents':
				case 'foreign':
				case 'insidebusiness':
				case 'insiders':
				case 'landline':
				case 'lateline':
				case 'latelinebusiness':
				case 'pm':
				case 'sportoffsiders':
				case 'stateline':
				case 'worldtoday': 		profile = 'currentaffairs'; break;

				// tv
				case 'tv':
					profile = 'tv';
					if (directories[2] == 'messagestick') {
						profile = 'indigenous'; // should catch '/tv/messagestick/'
					}
					break;

				// other tv - all sites that do not redirect to /tv
				case '100years':
				case '4minutewonders':
				case 'aplacetothink':
				case 'architecture':
				case 'atthemovies':
				case 'blackfriday':
				case 'catalyst':
				case 'changi':
				case 'cnnnn':
				case 'compass':
				case 'documentaryonline':
				case 'dustonmyshoes':
				case 'dynasties':
				case 'ebiz':
				case 'einsteinfactor':
				case 'etimor':
				case 'fly':
				case 'flytv':
				case 'gameon':
				case 'gardening':
				case 'glasshouse':
				case 'gnt':
				case 'gondola':
				case 'grassroots':
				case 'hotchips':
				case 'http':
				case 'jamescancook':
				case 'jtv':
				case 'juniors':
				case 'kombi':
				case 'kyliekwong':
				case 'lifeat2':
				case 'longway':
				case 'mda':
				case 'mediawatch':
				case 'miniseries':
				case 'myfavouritealbum':
				case 'myfavouritebook':
				case 'myfavouritefilm':
				case 'nature':
				case 'occasionalcook':
				case 'pacificstories':
				case 'passions':
				case 'plumpton':
				case 'quantum':
				case 'rage':
				case 'recovery':
				case 'schoolstv':
				case 'seachange':
				case 'secretrecipes':
				case 'storm':
				case 'stowaways':
				case 'strictlydancing':
				case 'sundayspectrum':
				case 'surfingmenu':
				case 'tasting':
				case 'thingo':
				case 'time':
				case 'treasurehunt':
				case 'truths':
				case 'walling':
				case 'wing':			profile = 'tv'; break;

				// vod
				case 'vod':				profile = 'vod'; break;

				// radio
				case 'radio':
				case 'pipeline':
				case 'streaming':
				case 'wideopenroad':	profile = 'radioother'; break;

				//ABC Open
				case 'open':			profile = 'open'; break;

				// radio national
				case 'radionational':
				case 'rn':
				case 'comms':
				case 'money':			profile = 'rn'; break;

				// classic fm
				case 'classic':			profile = 'classicfm'; break;

				// news radio
				case 'newsradio':		profile = 'newsradio'; break;

				// dig
				case 'dig':				profile = 'dig'; break;

				// triple j
				case 'triplej':
				case 'noise':			profile = 'triplej'; break;

				// radio australia
				case 'ra':
				case 'global':
				case 'power':
				case 'timetotalk':		profile = 'radioaustralia'; break;

				// australia network
				case 'international': 	profile = 'australianetwork'; break;

				// local
				case 'local':
				case 'rural':
				case 'australiaallover':
				case 'adelaide':
				case 'alicesprings':
				case 'backyard':
				case 'ballarat':
				case 'brisbane':
				case 'brokenhill':
				case 'built':
				case 'canberra':
				case 'capricornia':
				case 'centralcoast':
				case 'centralvic':
				case 'centralwest':
				case 'coffscoast':
				case 'coodabeens':
				case 'darwin':
				case 'emergency':
				case 'esperance':
				case 'eyre':
				case 'farnorth':
				case 'freshair':
				case 'gippsland':
				case 'goldcoast':
				case 'goldfields':
				case 'goulburnmurray':
				case 'greatsouthern':
				case 'heywire':
				case 'hobart':
				case 'humouraustralia':
				case 'illawarra':
				case 'katherine':
				case 'kimberley':
				case 'melbourne':
				case 'midnorthcoast':
				case 'milduraswanhill':
				case 'newcastle':
				case 'newengland':
				case 'northwest':
				case 'northwestqld':
				case 'nightlife':
				case 'northandwest':
				case 'northcoast':
				case 'northqld':
				case 'northtas':
				case 'northwestwa':
				case 'nsw':
				case 'nt':
				case 'overnights':
				case 'oztrax':
				case 'perth':
				case 'profiles':
				case 'queensland':
				case 'recipes':
				case 'riverina':
				case 'riverland':
				case 'sa':
				case 'snc':
				case 'shepparton':
				case 'shortstories':
				case 'snapshots':
				case 'southcoast':
				case 'southeastnsw':
				case 'southeastsa':
				case 'southqld':
				case 'sundaynights':
				case 'southwestvic':
				case 'southwestwa':
				case 'sundaynights':
				case 'sundayprofile':
				case 'sundays':
				case 'sunshine':
				case 'sydney':
				case 'tasmania':
				case 'torch':
				case 'tropic':
				case 'tropicalnorth':
				case 'upperhunter':
				case 'westernplains':
				case 'westernvic':
				case 'westqld':
				case 'westernqld':
				case 'wheatbelt':
				case 'widebay':
				case 'victoria':
				case 'wa':
				case 'water':
				case 'wordmap':			profile = 'local'; break;

				// corporate
				case 'corp':
				case 'archives':
				case 'contact':
				case 'tours':
				case 'trailer':
				case 'reception':
				case 'jobs':			profile = 'other'; break;

				// commercial
				case 'commercial':
				case 'enterprises':
				case 'abccontentsales':
				case 'abcresourcehire':
				case 'programsales':	profile = 'commercial'; break;

				// kids
				case 'children':
				case 'abckids':
				case 'abcforkids':
				case 'abc4kids':
				case 'broadbandkids':
				case 'bligh':
				case 'chiko':
				case 'dogandcatnews':	profile = 'kids'; break;

				// abc3
				case 'abc3':
				case 'creaturefeatures':
				case 'spark':
				case 'rollercoaster':
				case 'silversun':
				case 'zimmertwins':		profile = 'abc3'; break;

				// education
				case 'bloke':
				case 'federation':
				case 'talkitup':
				case 'learn':
				case 'countusin':
				case 'wordmap':
				case 'oceans':
				case 'civics':
				case 'navigators':		profile = 'other'; break;

				// indigenous
				case 'dustechoes':
				case 'indigenous':
				case 'message':
				case 'messageclub':
				case 'missionvoices':
				case 'speakingout':
				case 'usmob': 			profile = 'indigenous'; break;

				// grandstand
				case 'paralympics':
				case 'sport':
				case 'commonwealthgames':
				case 'grandstand': 		profile = 'grandstand'; break;

				default:				profile = 'other';
			}
	}

	// load Webtrends
	if (!dev) {
		var s=document.createElement("script"); s.async=true; s.src="http://www.abc.net.au/res/libraries/stats/webtrends-10.2/webtrends.load."+profile+".js";
		var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
	}

	return {
		getProfile: function() {
			return profile;
		}
	};
}();
