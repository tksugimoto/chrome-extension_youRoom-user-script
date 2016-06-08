
if (location.pathname.match(/(^\/r\/\d+)/)) {
    var roomPath = RegExp.$1;
    function changeTagText2Link(elems){
        Array.prototype.forEach.call(elems, function (elem){
            if (elem.querySelector) {
                elem.querySelectorAll(".content p.simple_format").forEach(content => {
					content.childNodes.forEach(node => {
						if (node instanceof Text) {
							var texts = node.textContent.split(/(#[^\s<>]+)/);
							if (texts.length !== 1) {
								texts.filter(text => {
									return text !== "";
								}).map(text => {
									if (text[0] === "#") {
										var a = document.createElement("a");
										a.href = `${roomPath}?flat=flat&search_query=${encodeURIComponent(text)}`;
										a.innerText = text;
										return a;
									} else {
										return document.createTextNode(text);
									}
								}).reduceRight((previousValue, currentValue, index) => {
									if (previousValue === null) {
										node.parentNode.replaceChild(currentValue, node);
									} else {
										previousValue.parentNode.insertBefore(currentValue, previousValue);
									}
									return currentValue;
								}, null);
							}
						}
					});
                });
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