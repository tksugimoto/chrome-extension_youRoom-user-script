
window.addEventListener("beforeunload", evt => {
	var elems = document.querySelectorAll("textarea");
	var isEditing = Array.from(elems).filter(elem => {
		// 表示中の要素
		return elem.offsetParent !== null;
	}).some(elem => {
		return elem.value.replace(/^\s|\s$/g, "") !== "";
	});
	if (isEditing) {
		evt.returnValue = "編集中ですが閉じても良いですか？";
	}
});

// テキストエリアのデフォルト表示にplaceholderではなくvalueを使われているので修正
Array.from(document.querySelectorAll("textarea[title]")).forEach(textarea => {
	textarea.placeholder = textarea.value;
	textarea.value = "";
	// 初期表示はどうやらtitle属性で管理しているらしい
	textarea.title = "";
});
