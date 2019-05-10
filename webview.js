module.exports = (Franz, settings) => {
  function getMessages() {
    Franz.setBadge(document.querySelectorAll('mws-conversation-list-item div.text-content.unread').length);
  }

  if (settings.isDarkModeEnabled) {
    localStorage.setItem('dark_mode_enabled', 'true');
  } else {
    localStorage.setItem('dark_mode_enabled', 'false');
  }

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
