'use strict';

// NOTE: The following examples illustrate how to use snoowrap. However, hardcoding
// credentials directly into your source code is generally a bad idea in practice (especially
// if you're also making your source code public). Instead, it's better to either (a) use a separate
// config file that isn't committed into version control, or (b) use environment variables.

var refresh = "11410363552-4HwkyanWsp62GbdytzisH30o7vs";
var access = "";
var clientid = "yS9E1ipXWiY0MQ";
var clientsecret = "yg-dZKjZMwqx03mW4KOzvmbq-R8";
// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
const r = new snoowrap({
  userAgent: 'offline_reddit',
  clientId: clientid,
  clientSecret: clientsecret,
  refreshToken: refresh
});

// That's the entire setup process, now you can just make requests.

async function getPost() {
    var e = document.getElementById("sort");
    var sort = e.options[e.selectedIndex].value;
    e = document.getElementById("sub");
    var sub = e.value;
    var res;
    switch(sort) {
        case "hot":
            await r.getSubreddit(sub).getHot().then((result) => {res=result;});
            break;
        case "new":
            await r.getSubreddit(sub).getNew().then((result) => {res=result;});
            break;
        case "week":
            await r.getSubreddit(sub).getTop({time: 'week'}).then((result) => {res=result;});
            break;
        case "day":
            await r.getSubreddit(sub).getTop({time: 'day'}).then((result) => {res=result;});
            break;
    };
    e = document.getElementById("title");
    e.innerHTML = res[0].title;
    e = document.getElementById("img");
    e.setAttribute("src", res[0].preview.images[0].source.url);
}