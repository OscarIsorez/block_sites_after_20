// background.js

function getCurrentHour() {
  const now = new Date();
  return now.getHours();
}

function isBlockedTime(blockTime) {
  const currentHour = getCurrentHour();
  return currentHour >= blockTime;
}

// Lorsqu'une navigation commence
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.local.get(["blockedSites", "blockTime"], (data) => {
    const sites = data.blockedSites || [];
    const blockTime = data.blockTime || 20; // valeur par défaut si non définie

    if (isBlockedTime(blockTime)) {
      for (let site of sites) {
        if (details.url.includes(site)) {
          chrome.tabs.update(details.tabId, { url: "about:blank" });
          break;
        }
      }
    }
  });
}, {
  url: [{ schemes: ['http', 'https'] }]
});
