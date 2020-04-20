---
title: "Push"
path: "/projects/push"
sub: "2015 –"
icon: "push"
tagline: "The world's most versatile desktop notifications framework"
duration: "May 2015 – Present"
website: "https://pushjs.org"
status: "Active"
stack: "JavaScript"
---

### Overview

Push (also PushJS or Push.js), is a lightweight [shim](<https://en.wikipedia.org/wiki/Shim_(computing)>) around the [JavaScript desktop notifications API](https://developer.mozilla.org/en-US/docs/Web/API/notification) that allows developers to easily send push notifications to your desktop. The only caveat, however, is your browser window must be open in order for this to occur (or a ServiceWorker must be registered and the browser must be running in the background).

Push was developed in 2015 for [Linguistic](/projects/linguistic), back when Linguistic was nothing more than a browser-based, chatroulette website for language learners. The library didn't gain a widespread attention until 2016, when Push was uploaded to [Hacker News](https://news.ycombinator.com/item?id=11715918). Seemingly overnight, the library garnered a mass following, resulting in over [500 upvotes on ProductHunt](https://www.producthunt.com/posts/push-js), [8,200 GitHub stars](https://github.com/Nickersoft/push/stargazers), 1.2 million NPM downloads, and a [plethora of web articles](https://github.com/Nickersoft/push.js/wiki/Resources) written about it.

Since Push's release, I've written a tutorial for [Net Magazine](https://www.creativebloq.com/net-magazine) as well as a [personal introduction](https://blog.tylernickerson.com/push-js-an-introduction-49291ac986e8) regarding it. Version 1.0 of the library was released in July of 2017. Today, the repository is co-maintained by myself and Devesh Sati of [PushOwl](https://pushowl.com/), an Indian platform for e-commerce push notifications.

### Motivation

In 2015, the beta version of Linguistic required the ability to send desktop notifications to a user if another user messaged them if their browser was open in the background. At that time, something like [this](https://stackoverflow.com/a/27325377) was required to send a single push notification:

```javascript
function showNotification() {
  var notification = new Notification("This is a clickable notification", {
    body: "Click Me",
  })

  notification.onclick = function () {
    window.open("http://google.com/")
  }
}

if (!("Notification" in window)) {
  alert("This browser does not support desktop notification")
} else if (Notification.permission === "granted") {
  showNotification()
} else if (Notification.permission !== "denied") {
  Notification.requestPermission(function (permission) {
    if (permission === "granted") {
      showNotification()
    }
  })
}
```

Note that the above does not take legacy browsers into consideration. A more comprehensive solution would have required even more conditionals and edge case considerations. As you can imagine, I deemed it necessary to wrap up this logic into a portable library. With Push, the above becomes:

```javascript
Push.create("This is a clickable notification", {
  body: "Click Me",
  onClick: function () {
    window.open("http://google.com/")
  },
})
```

Like magic, Push manages all the permission handling for you. All this said, at the time, there were other solutions to push notifications as well (why I didn't use them is beyond me): [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/js/client) and [OneSignal](https://onesignal.com/).

### Design

As of v1.0, Push consists of a series of "agents", or classes designed to push notifications to specific browsers: Desktop (all modern browsers), Firefox (Legacy), Microsoft (IE & Edge), and Webkit (Legacy Safari & Chrome). The logic Push follows is as so:

1. If the Javascript `Notification` object exists, attempt to open a notification via the JavaScript Notifications API. If an error occurs, then we're most likely on an Android device using Chrome (which supports but disables the API), so we then use ServiceWorkers instead.
2. If the `Notification` object doesn't exist, attempt the WebKit agent.
3. If the WebKit agent fails, try the Firefox agent.
4. If the Firefox agent fails, try the Microsoft agent.
5. If the Microsoft agent fails, execute the `fallback` function specified in the Push configuration.

For full documentation, check out the [Push homepage](https://pushjs.org) or its [GitHub repo](https://github.com/Nickersoft/push.js).
