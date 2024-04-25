
(function(n){var t=n.Process||{},i=function(n){var t=+n;return isNaN(t)?n:t},u=function(n){return decodeURIComponent(n.replace(/\+/g,"%20"))},h=/\{(.+?)\}/g,c=window.location.hash&&window.location.hash[1]==="~"&&!/\bSPPC=./i.test(document.cookie||""),s=[],e=null,r=null,o=null,f=null;t.Page=function(n){for(var i=n.length;i--;)c?s.push(n[i]):t.Element(document.getElementById(n[i]))};t.Delayed=function(){var n,i;for(r=null;n=s.shift();)t.Element(document.getElementById(n));try{i=new CustomEvent("process.delayed",{bubbles:!0,cancelable:!0});document.documentElement.dispatchEvent(i)}catch(u){}};t.Element=function(n){if(n)switch(n.getAttribute("data-process")){case"if":t.If(n);break;case"replace":t.Replace(n);break;default:t.Fix(n)}};t.Replace=function(n){var i,f=n.parentNode,r=document.createTextNode(t.Get(n.getAttribute("data-replace"))),u=n.firstElementChild;u&&u.getAttribute&&(i=u.getAttribute("href"))&&i.substring(0,4)==="tel:"&&(i=document.createElement("a"),i.setAttribute("href","tel:"+r.data),i.appendChild(document.createTextNode(r.data)),r=i);f.insertBefore(r,n);f.removeChild(n)};t.Fix=function(n){var r,u,i,f=n.attributes.length,e=n.childNodes.length;if(n.nodeName==="SCRIPT"){n.parentNode.removeChild(n);return}while(f--)r=n.attributes[f],r.name.substring(0,13)=="data-replace-"&&(u=r.name.substring(13),n.setAttribute(u,t.Get(r.value)),n.removeAttribute(r.name));while(e--)i=n.childNodes[e],i.nodeType===3&&i.data&&i.data.indexOf("{")>=0&&(i.data=t.Get(i.data))};t.If=function(n){for(var i,u,f,e,o=n.parentNode,s=n.attributes.length,r=undefined;s--;){i=n.attributes[s];switch(i.name){case"field":r=t.Check(n,t.Get(i.value));break;case"nofield":r=!t.Check(n,t.Get(i.value))}if(r!==undefined)break}if(r)for(u=n.childNodes,f=0,e=u.length;f<e;f++)o.insertBefore(u[0],n);o.removeChild(n)};t.Check=function(n,r){for(var u,f,e=n.attributes.length;e--;){u=n.attributes[e];switch(u.name){case"equals":return r==t.Get(u.value);case"gt":case"greaterthan":case"morethan":return i(r)>i(t.Get(u.value));case"gte":return i(r)>=i(t.Get(u.value));case"lt":case"lessthan":case"lesserthan":return i(r)<i(t.Get(u.value));case"lte":return i(r)<=i(t.Get(u.value));case"ne":case"notequals":return r!=t.Get(u.value);case"contains":return f=t.Get(u.value),r.indexOf(f>=0);case"notcontains":return f=t.Get(u.value),!r.indexOf(f>=0);case"in":return f=t.Get(u.value),t.InArray(r,(""+f).split(","));case"notin":return f=t.Get(u.value),!t.InArray(r,(""+f).split(","));case"between":return f=t.Get(u.value).Split(","),f.length==2&&i(r)>=i(f[0])&&i(r)<=i(f[1])?!0:!1}}return!!r};t.InArray=function(n,t){for(var i=t.length;i--;)if(t[i]==n)return!0;return!1};t.Get=function(n){return n.replace(h,function(n,i){var r=i.split("/"),f=r.shift();return t.Data(f.split(":"),0,r[0])||u(r.shift()||"")})};t.Data=function(n,i,r){var u;switch(n[i].toLowerCase()){case"f":return t.Format(n[i+1],n,i+2,r);case"if":return t.Data(n,i+1)?n.pop():"";case"ifno":case"ifnot":return t.Data(n,i+1)?"":n.pop();case"q":case"querystring":return t.Query(n[i+1])||"";case"session":case"cookie":return t.Cookie(n[i+1])||"";case"number":return t.Number(n[i+1],r)||"";case"request":return u=t.Cookie("RWQ")||window.location.search,u&&u[0]==="?"&&n[i+1]&&n[i+1][0]!="?"&&(u=u.substr(1)),u;case"u":return t.UserData(n[i+1])||"";default:return""}};t.Format=function(n,i,r,u){var h,f,s,e,o;if(!n||r>i.length-1)return"";if(h=null,f=null,n=n.toLowerCase(),e=0,n=="binary")e=2;else if(r+1<i.length)switch(n){case"p":case"phone":case"p2":case"phone2":case"p3":case"phone3":i[r].indexOf("0")>=0&&(f=i[r],e=1);break;default:s=parseInt(i[r]);isNaN(s)||(h=s,e=1)}o=t.Data(i,r+e,u);switch(n){case"p":case"phone":return t.Phone(""+o,f);case"p2":case"phone2":return t.Phone(""+o,f||"000.000.0000");case"p3":case"phone3":return t.Phone(""+o,f||"000-000-0000");case"tel":return t.Phone(""+o,f||"0000000000")}};t.Phone=function(n,t){var u,i,f,r;if(!n)return"";if(u=n.replace(/\D+/g,""),u.length<10)return n;for(i=(t||"(000) 000-0000").split(""),f=0,r=0;r<i.length;r++)i[r]=="0"&&(f<u.length?i[r]=u[f++]:(i.splice(r,1),r--));return f==10&&u.length>10&&i.push(" x"+u.substring(10)),i.join("")};t.Query=function(n){var r,f,o,i,s;if(!e)for(e={},r=t.Cookie("RWQ")||window.location.search,f=r?r.substring(1).split("&"):[],o=f.length;o--;)i=f[o].split("="),s=u(i.shift()).toLowerCase(),e[s]=i.length?u(i.join("=")):null;return e[n.toLowerCase()]};t.Cookie=function(n){var f,i,o,e,t;if(!r)for(r={},f=document.cookie?document.cookie.split("; "):[],i=f.length;i--;){o=f[i].split("=");e=u(o.shift()).toLowerCase();t=o.join("=");switch(t[0]){case"#":r[e]=+t.substring(1);break;case":":r[e]=new Date(+t.substring(1));break;case"!":r[e]=t==="!!";break;case"'":r[e]=u(t.substring(1));break;default:r[e]=u(t)}}for(f=n.split("|"),i=0;i<f.length;i++)if(t=r[f[i].toLowerCase()],t)return t;return""};t.UserData=function(n){switch(n){case"DisplayName":return t.Cookie("U_DisplayName")||"";case"TimeOfDay":var r=new Date,i=r.getHours();return i>=17||i<5?"Evening":i<12?"Morning":"Afternoon"}};t.Number=function(n,i){var s,u,r,e;if(!i)return i;if(!o)for(o={},s=(t.Cookie("PHMAP")||"").split(","),e=0;e<s.length;e++)u=(s[e]||"").split("="),u.length===2&&(o[u[0]]=u[1]);return r=o[i],r&&r!=="0"||(r=i),f||(f={}),f[r]=1,r};t.Phones=function(){var n,t;if(f){n=[];for(t in f)f.hasOwnProperty(t)&&n.push(t);return n.join("|")}return null};n.Process=t;document.documentElement&&(document.documentElement.clientWidth<=1280||(t.Cookie("pref")&1)==1)&&(document.documentElement.className+=" minimize")})(this);
(function(){function o(){var r,n,u;for(v(),f=!0,n=0;n<t.length;n++)r=t[n],s(r[0],r[1]);for(t.length=0,n=0;n<i.length;n++)u=i[n],l(u);i.length=0;window.removeEventListener("DOMContentLoaded",o)}function v(){for(var t,i,f,e,h=document.querySelectorAll("script[src],script[data-require]"),o=0;o<h.length;o++){var c=h[o],s=c.getAttribute("src"),n=c.getAttribute("data-require");if(s||n)for(t=n&&n[0]==="["?u(a(n)):[],s&&t.push(s),i=0;i<t.length;i++)f=t[i],e=/(.+?)\.\d{13}(\.\w{2,12})$/.exec(f),e&&(f=e[1]+e[2]),r[f]=1}}function s(i,u){var h,c,s,o;if(!f){t.push([i,u]);return}for(h=[],c=!1,o=0;o<i.length;o++){if(s=i[o],!s||e[s])continue;else r[s]||(h.push(s),r[s]=1);c=!0}for(typeof u=="function"&&(c?n.push([i,u]):u(window.jQuery)),o=0;o<h.length;o++)y(h[o])}function y(n){if(n.indexOf("http://")===0)throw new Error("Cannot load scripts over unsecure channel: "+n);else n.indexOf("/common/")===0||n.indexOf("/cms/")===0?w(n):p(n)}function p(n){var t=document.createElement("script");t.setAttribute("async","async");t.setAttribute("src",n);n.indexOf("callback=registerGmap")===-1?t.addEventListener("load",function(){h(n)}):window.registerGmap=function(){h(n)};t.addEventListener("error",function(){throw new Error("Unable to load script: '"+n+"'");});document.head.appendChild(t)}function w(n,t){var i=document.createElement("script");if(i.setAttribute("data-require",'["'+n+'"]'),n.indexOf("/common/usc/js/")===0||n==="/common/usc/p/video.js")if(typeof Promise=="undefined")throw new Error("This browser doesn't support ES6 modules.  Cannot load: '"+n+"'");else i.setAttribute("type","module");typeof t=="string"?i.text=t:i.src=n;document.head.appendChild(i)}function b(){var n=document.documentElement.getAttribute("data-gmap");return n?"&key="+n:""}function u(n){var i,r,u,f,t;for(Array.isArray(n)||(n=[n]),i={},r=0;r<n.length;r++)if(n[r])for(u=c[n[r]]||n[r],Array.isArray(u)||(u=[u]),f=0;f<u.length;f++)t=u[f],t.indexOf("://")!==-1||t[0]==="/"?i[t]=1:t.indexOf("admin/")===0?i["/common/"+t+".js"]=1:t.indexOf("usc/")===0?i["/common/"+t+".js"]=1:t.indexOf("cms/")===0?i["/"+t+".js"]=1:i["/common/js/"+t+".js"]=1;return Object.keys(i)}function h(n){for(var t,o=u(n),r=0;r<o.length;r++)t=o[r],e[t]=1,f?l(t):i.push(t)}function l(t){for(var u,h,r,f=[],i=0;i<n.length;i++)r=n[i],r[0].indexOf(t)!==-1&&f.push(r);for(i=0;i<f.length;i++){var r=f[i],o=r[0],s=[];for(u=0;u<o.length;u++)e[o[u]]||s.push(o[u]);if((r[0]=s,!s.length)&&(h=r[1],h))try{h(window.jQuery)}catch(c){console.warn(c.stack)}}for(i=n.length-1;i>=0;i--)r=n[i],r[0].length||n.splice(i,1)}var a=function(n,t){return(window.JSON2||JSON).parse(n,t)},f=!1,t=[],i=[],r={},e={},n=[],c;document.readyState==="complete"||document.readyState==="loaded"||document.readyState==="interactive"?o():window.addEventListener("DOMContentLoaded",o);c={jquery:["j/jquery.3.x","j/jquery.ui"],"j/jquery":"j/jquery.3.x",poly:"usc/p/poly",cookie:"j/jquery.cookie",jwplayer:"/common/js/v/jwplayer.js",map:"m/gmap",googlemap:"https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=registerGmap"+b()};window.requireLoading=function(n){var t=u(n);return t&&r[t[0]]};window.require=window.require2=window.rrequire=function(n,t){var i=u(n),f,r;for(typeof t!="function"&&typeof arguments[2]=="function"&&(t=arguments[2]),f=!1,r=0;r<i.length;r++)i[r].indexOf("jquery")!==-1&&(f=!0);f?(console.warn("Requiring jQuery should be avoided for performance reasons."),s(i,t)):s(i,t)};window.register=h})();
window.Process&&Process.Page(['Process_HeaderS4','HeaderS4_1','HeaderS4_2','HeaderS4_3']);
{
	"@context": "https://schema.org",
	"@type": "Electrician",
	"name": "Zar Electric",
	"description": "Raleigh Electrical Company",
	"address": {
		"@type": "PostalAddress",
		"streetAddress": "1404 Wall Rd, Suite 100",
		"addressLocality": "Wake Forest",
		"addressRegion": "NC",
		"postalCode": "27587"
	},
	"image": "/images/logos/Logo.2109091245035.png",
	"telePhone": "(919) 200-6551",
	"url": "https://www.zarelectric.net",
	"geo": {
		"@type": "GeoCoordinates",
		"latitude": "36.0127156",
		"longitude": "-78.5142146"
	}
}

var loadDeferredStyles = function() {
	var addStylesNode = document.getElementById('deferred-styles');
	var replacement = document.createElement('div');
	replacement.innerHTML = addStylesNode.textContent;
	document.body.appendChild(replacement)
	addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener('load', loadDeferredStyles);

document.write=function(text){
  if(!text||!text.trim()){
    return;
  }
  var reg_script=/^(<script[^>]*?>)([\s\S]*?)<\/script>$/g;
  var m=reg_script.exec(text);
  if(m){
    var src=/\bsrc=["']([\s\S]+?)["']/g.exec(m[1]);
    var script=document.createElement('script');
    script.setAttribute('data-document-write','');
    document.body.appendChild(script);
    if(src){
      script.src=src[1];
    }else{
      script.innerHTML = m[2];
    }
  }else if(text.indexOf('<noscript')===-1){
    var parser=new DOMParser();
    var doc=parser.parseFromString(text,'text/html');
    while(doc.body.children.length){
      document.body.appendChild(doc.body.firstElementChild);
    }
  }
};
(function(){
var list=[
	"%0D%0A",
	"%3C!--%20Global%20site%20tag%20(gtag.js)%20-%20Google%20Ads%3A%20AW-848565742%20--%3E",
	"%0D%0A%20%20",
	"%3Cscript%20async%20src%3D%22https%3A%2F%2Fwww.googletagmanager.com%2Fgtag%2Fjs%3Fid%3DAW-848565742%22%3E%3C%2Fscript%3E",
	"%0D%0A%20%20",
	"%3Cscript%3E%0D%0A%20%20%20%20window.dataLayer%20%3D%20window.dataLayer%20%7C%7C%20%5B%5D%3B%0D%0A%20%20%20%20function%20gtag()%20%7B%20dataLayer.push(arguments)%3B%20%7D%0D%0A%09%09gtag('js'%2C%20new%20Date())%3B%0D%0A%09%0D%0Agtag('config'%2C'AW-848565742')%3B%0D%0A%0D%0A%20%20%3C%2Fscript%3E",
	"%0D%0A%0A",
	"%3C!--%20Google%20Tag%20Manager%20--%3E",
	"%0D%0A",
	"%3Cscript%3E(function(w%2Cd%2Cs%2Cl%2Ci)%7Bw%5Bl%5D%3Dw%5Bl%5D%7C%7C%5B%5D%3Bw%5Bl%5D.push(%7B'gtm.start'%3A%0D%0Anew%20Date().getTime()%2Cevent%3A'gtm.js'%7D)%3Bvar%20f%3Dd.getElementsByTagName(s)%5B0%5D%2C%0D%0Aj%3Dd.createElement(s)%2Cdl%3Dl!%3D'dataLayer'%3F'%26l%3D'%2Bl%3A''%3Bj.async%3Dtrue%3Bj.src%3D%0D%0A'https%3A%2F%2Fwww.googletagmanager.com%2Fgtm.js%3Fid%3D'%2Bi%2Bdl%3Bf.parentNode.insertBefore(j%2Cf)%3B%0D%0A%7D)(window%2Cdocument%2C'script'%2C'dataLayer'%2C'GTM-TK5JB79')%3B%3C%2Fscript%3E",
	"%0D%0A",
	"%3C!--%20End%20Google%20Tag%20Manager%20--%3E",
	"%0A",
	"%3C!--%20Facebook%20Pixel%20Code%20--%3E",
	"%0D%0A",
	"%3Cscript%3E%0D%0A!function(f%2Cb%2Ce%2Cv%2Cn%2Ct%2Cs)%7Bif(f.fbq)return%3Bn%3Df.fbq%3Dfunction()%7Bn.callMethod%3F%0D%0An.callMethod.apply(n%2Carguments)%3An.queue.push(arguments)%7D%3Bif(!f._fbq)f._fbq%3Dn%3B%0D%0An.push%3Dn%3Bn.loaded%3D!0%3Bn.version%3D'2.0'%3Bn.queue%3D%5B%5D%3Bt%3Db.createElement(e)%3Bt.defer%3D!0%3B%0D%0At.src%3Dv%3Bs%3Db.getElementsByTagName(e)%5B0%5D%3Bs.parentNode.insertBefore(t%2Cs)%7D(window%2C%0D%0Adocument%2C'script'%2C'%2F%2Fconnect.facebook.net%2Fen_US%2Ffbevents.js')%3B%0D%0A%0D%0Afbq('dataProcessingOptions'%2C%20%5B'LDU'%5D%2C%200%2C%200)%3B%0D%0A%0D%0Afbq('init'%2C%20'807453036099015')%3B%0D%0Afbq('track'%2C%20'PageView')%3B%3C%2Fscript%3E",
	"%0D%0A",
	"%0D%0A",
	"%3C!--%20End%20Facebook%20Pixel%20Code%20--%3E",
	"%0A"
];
var ready=function(){
  requestAnimationFrame(function(){
    for(var i=0;i<list.length;i++){
      var code=decodeURIComponent(list[i]);
      document.write( code );
    }
  });
  window.removeEventListener('DOMContentLoaded',ready);
};
switch (document.readyState){
  case 'complete':
  case 'loaded':
  case 'interactive':
    ready();
    break;
  default:
    window.addEventListener('DOMContentLoaded',ready);
  break;
}
})();

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());
	
gtag('config','AW-848565742');

  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TK5JB79');
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.defer=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','//connect.facebook.net/en_US/fbevents.js');

fbq('dataProcessingOptions', ['LDU'], 0, 0);

fbq('init', '807453036099015');
fbq('track', 'PageView');