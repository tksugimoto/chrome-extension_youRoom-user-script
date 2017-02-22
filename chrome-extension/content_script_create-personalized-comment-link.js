{
	const createPersonalizedCommentLink = commentContainer => {
		commentContainer.querySelectorAll(".comment-time").forEach(timeElem => {
			if (timeElem.parentNode.TagName !== "A") {
				const commentWrapper = timeElem.closest(".comment-wrapper");
				if (commentWrapper && commentWrapper.id) {
					const a = document.createElement("a");;
					a.href = "#" + commentWrapper.id;
					timeElem.parentNode.replaceChild(a, timeElem);
					a.appendChild(timeElem);
				}
			}
		});
	};

	document.querySelectorAll(".comment-container").forEach(createPersonalizedCommentLink);

	const container = document.querySelector(".group-entry-container");
	if (container) {
		new MutationObserver(mutationRecords => {
			mutationRecords.forEach(mutationRecord => {
				mutationRecord.addedNodes.forEach(elem => {
					if (elem.classList) {
						if (elem.classList.contains("comment-container")
							|| elem.classList.contains("child-comment-container")) {
							createPersonalizedCommentLink(elem);
						}
					}
				});
			});
		}).observe(container, {
			childList: true,
			subtree: true
		});
	}
}
