// Gets the computed style. Pulled from https://stackoverflow.com/a/2664055/544326
function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  }
}

module.exports = (Franz) => {
  function getMessages() {
    const messages = document.querySelectorAll('[aria-label=Conversations]>content span:not([class])');

    let unreadCount = 0;
    for (let i = 0; i < messages.length; i++) {
      // at the time, 400 is normal, and 600 is bold. 500 is halfway in between
      // this should give some leeway if Google decides to change the weight a little
      if (parseFloat(getStyle(messages[i], "fontWeight")) > 500) {
        unreadCount++;
      }
    }

    // set Franz badge
    Franz.setBadge(unreadCount);
  }

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
