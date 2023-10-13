export function loadingCursor() {
    setTimeout(() => {
        document.body.style.cursor = 'default'; // default on load

        // Get all anchor tags on the page
        var anchorTags = document.querySelectorAll("a");
        // Attach the event handler to each anchor tag
        anchorTags.forEach(function(anchor) {
            anchor.onclick = function() {
                document.body.style.cursor = 'wait'; // Change cursor to wait
            };
        });
    }, 1000);
}