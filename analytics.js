// Google Analytics para Las Nenas de Paquito
// Reemplaza GA_MEASUREMENT_ID con tu ID real de Google Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'GA_MEASUREMENT_ID', 'auto');
ga('send', 'pageview');

// Track webcam changes
function trackWebcamChange(webcamName) {
    ga('send', 'event', 'Webcam', 'Change', webcamName);
}

// Track chat interactions
function trackChatInteraction(action) {
    ga('send', 'event', 'Chat', action, 'User Interaction');
}

// Track video views
function trackVideoView() {
    ga('send', 'event', 'Video', 'View', 'Webcam Stream');
}

// Track page load time
window.addEventListener('load', function() {
    setTimeout(function() {
        var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        ga('send', 'timing', 'Page Load', 'Load Time', loadTime);
    }, 0);
}); 