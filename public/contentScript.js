// This script will run on Wikipedia pages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    const content = document.querySelector('.mw-parser-output').innerText;
    // Here you would implement or call your summarization algorithm
    // For this example, we'll just return the first 500 characters
    const summary = content.substring(0, 500) + '...';
    sendResponse({ summary: summary });
  }
});
