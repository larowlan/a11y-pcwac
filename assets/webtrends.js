// WebTrends SmartSource Data Collector Tag v10.2.29
// Copyright (c) 2012 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.0.28
// Created: 2012.07.17
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:"dcsf5c32a00000wcbyai4apl5_6h3i",
        domain:"statse.webtrendslive.com",
        timezone:10,
        i18n:false,
        adimpressions:true,
        adsparam:"WT.ac",
        offsite:true,
        download:true,
        downloadtypes:"3gp,aac,asf,asx,avi,csv,doc,exe,flv,kml,kmz,m3u,m4a,m4r,m4v,mov,mp3,mpg,mp4,opml,pdf,ppt,ram,rm,swf,txt,wav,wm,wma,wmv,xls,zip,docx,xlsx,rar,gzip",
        metanames:"DC.type",
        onsitedoms:new RegExp(".*abc.*|.*triplej.*|.*radioaustralia.*|.*australianetwork.*|.*digmusic.*"),
        fpcdom:"",
        plugins:{
            hm:{src:"//s.webtrends.com/js/webtrends.hm.min.js"},
//            facebook:{src:"//s.webtrends.com/js/webtrends.fb.min.js"},
//            LinkTracking: {src: "http://www.abc.net.au/res/libraries/stats/webtrends-10.2/linkTracking.js ", NodeIDs: "", NodeClasses: "", WTdl: "99", ParentNodes: "1", TrackRank: "0"},
            custom_attribs: { src: "http://www.abc.net.au/res/libraries/stats/webtrends-10.2/custom_attribs.js" }
        }
        }).track({
        	filter: function(tag, options)	{
        		if (typeof abcDev != "undefined" && abcDev)	{
        			return true;
        		}
        	},
	       	transform: function(tag, options)	{
						options['argsa'].push(
							"WT.z_site", "TV",
							"WT.z_dcsid", tag.dcsid);
        	}
      });
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="http://www.abc.net.au/res/libraries/stats/webtrends-10.2/webtrends.min.js";    
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());

var WT_linkTrackPages=[{}];
	