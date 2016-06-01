
if (location.pathname.match(/(^\/r\/\d+)/)) {
    var roomPath = RegExp.$1;
    function changeTagText2Link(elems){
        Array.prototype.forEach.call(elems, function (elem){
            if (elem.querySelector) {
                var content = elem.querySelector(".content");
                if (content) {
                    var html = content.innerHTML;
        //            content.innerHTML = html.replace(/#[a-z_]+(?=[^<>]*(?:$|<\/p>|<br>))/ig, function (tagText){
                    content.innerHTML = html.replace(/#[^\s<>]+(?=[^<>]*(?:$|<\/p>|<br>))/ig, function (tagText){
                        return '<a href="' + roomPath + '?flat=flat&search_query=' + encodeURIComponent(tagText) + '">' + tagText + '</a>';
                    });
                }
            }
        });
    }

    changeTagText2Link(document.querySelectorAll(".entry-container, .comment-area"));

    var entryContainer = document.getElementById("entries-container");
    if (entryContainer) {
        new MutationObserver(function (mutationRecords){
            mutationRecords.forEach(function (mutationRecord){
                changeTagText2Link(mutationRecord.addedNodes);
            });
        }).observe(entryContainer, {
        	childList: true
        });
    }
}