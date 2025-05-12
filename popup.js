// popup.js
document.getElementById('saveSettings').addEventListener('click', function () {
  const blockedSites = document.getElementById('blockedSites').value.split(',').map(site => site.trim());
  const blockTime = parseInt(document.getElementById('blockTime').value, 10);

  // Sauvegarder les paramètres dans le storage local
  chrome.storage.local.set({ blockedSites, blockTime });
});

// Charger les paramètres au démarrage
chrome.storage.local.get(['blockedSites', 'blockTime'], function (data) {
  if (data.blockedSites) {
    document.getElementById('blockedSites').value = data.blockedSites.join(', ');
  }
  if (data.blockTime) {
    document.getElementById('blockTime').value = data.blockTime;
  }
});
