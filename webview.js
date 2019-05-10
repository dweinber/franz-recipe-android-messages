module.exports = (Franz) => {
  function getMessages() {
    Franz.setBadge(document.querySelectorAll('mws-conversation-list-item div.text-content.unread').length);
  }

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
