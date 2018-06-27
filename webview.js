module.exports = (Franz) => {
  function getMessages() {
    const unreadCount = document.querySelectorAll('.tpEAA.yrs5ff').length;

    // set Franz badge
    Franz.setBadge(unreadCount);
  }

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
