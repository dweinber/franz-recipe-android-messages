"use strict";

const { remote } = require('electron');
const webContents = remote.getCurrentWebContents();
const { session } = webContents;

window.addEventListener('beforeunload', async () => {
  try {
    session.flushStorageData();
    session.clearStorageData({
      storages: ['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb']
    });
    const registrations = await window.navigator.serviceWorker.getRegistrations();
    registrations.forEach(r => {
      r.unregister();
      console.log('ServiceWorker unregistered');
    });
  } catch (err) {
    console.err(err);
  }
});

module.exports = Franz => {
  function getMessages() {
    // Reload on error
    const el = document.getElementById('af-error-container');

    if(el) {
      window.location.reload();
    }

    // Get message count
    const messages = document.querySelectorAll('.text-content.unread').length;
    Franz.setBadge(messages);
  }

  Franz.loop(getMessages);
};
