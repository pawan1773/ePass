/* To activate side nav and tool tip in mobile view */
document.addEventListener('DOMContentLoaded', function () {
	var sideNav = document.querySelectorAll('.sidenav');
	M.Sidenav.init(sideNav, 'left');
	toolTipped = document.querySelectorAll('.tooltipped');
	M.Tooltip.init(toolTipped, 'right');
});

/** To handle home link clicks */
document.querySelectorAll(".home-link").forEach((el) => {
	el.addEventListener("click", (e) => {
		document.querySelector("#content-container").classList.add("hidden");
		document.querySelector("#home-container").classList.remove("hidden");
	})
});

/** To handle content link clicks */
document.querySelectorAll(".content-link").forEach((el) => {
	el.addEventListener("click", (e) => {
		document.querySelector("#home-container").classList.add("hidden");
		document.querySelector("#content-container").classList.remove("hidden");
	})
});

var fileCategory = '';
/** To handle view PDF click */
var viewPdfs = document.querySelectorAll(".view-pdf");
viewPdfs.forEach((el) => {
	el.addEventListener("click", (e) => {
		document.querySelector("#home-container").classList.add("hidden");
		document.querySelector("#content-container").classList.remove("hidden");
		document.querySelector("#mode-btn-container").classList.remove("hidden");
		const displayPdf = e.target;

		if (displayPdf.classList.contains('emb-btn')) {
			displayPdf.classList.add("disabled");
			for (let sibling of displayPdf.parentNode.children) {
				if (sibling !== displayPdf) {
					sibling.classList.remove('disabled');
				}
			}
		} else {
			var modesBtns = document.querySelectorAll(".emb-btn");
			for (let modesBtn of modesBtns) {
				if (modesBtn.getAttribute("data-embed-mode") === 'SIZED_CONTAINER') {
					modesBtn.classList.add('disabled');
				} else {
					modesBtn.classList.remove('disabled');
				}
			}
		}
		var temp = displayPdf.getAttribute("data-file-category");
		if (!(typeof temp === 'object' && temp !== 'null') && temp !== '') {
			fileCategory = temp;
		}
		
		var previewFileConfig = '';
		for (var i = 0; i < FILE_CONFIG.length; i++) {
			if (FILE_CONFIG[i].fileCategory === fileCategory) {
				previewFileConfig = FILE_CONFIG[i];
				break;
			}
		}

		const viewerConfig = {
			"defaultViewMode": "FIT_PAGE",
			"embedMode": displayPdf.getAttribute("data-embed-mode")
		};

		var adobeDCView = new AdobeDC.View({
			clientId: CLIENT_ID,
			divId: "view-pdf-container"
		});

		setPreviewFile(adobeDCView, viewerConfig, previewFileConfig);
		postEventsToGoogleAnalytics(adobeDCView);
	});
});

/** To listen to file events and send it to google analytics */
function postEventsToGoogleAnalytics(adobeDCView) {
	adobeDCView.registerCallback(AdobeDC.View.Enum.CallbackType.EVENT_LISTENER, (e) => {
		switch (e.type) {
			case "DOCUMENT_OPEN":
				gtag('event', 'DOCUMENT_OPEN', {
					'event_category': 'DOCUMENT_OPEN',
					'event_label': 'DOCUMENT_OPEN',
					'value': e.data.fileName;
				});
				break;
			case 'PAGE_VIEW':
				gtag('event', 'PAGE_VIEW', {
					'event_category': 'PAGE_VIEW',
					'event_label': 'PAGE_VIEW'
				});
				break;
			case 'DOCUMENT_DOWNLOAD':
				gtag('event', 'DOCUMENT_DOWNLOAD', {
					'event_category': 'DOCUMENT_DOWNLOAD',
					'event_label': 'DOCUMENT_DOWNLOAD'
				});
				break;
			case 'DOCUMENT_PRINT':
				gtag('event', 'DOCUMENT_PRINT', {
					'event_category': 'DOCUMENT_PRINT',
					'event_label': 'DOCUMENT_PRINT'
				});
				break;
			case 'TEXT_COPY':
				gtag('event', 'TEXT_COPY', {
					'event_category': 'TEXT_COPY',
					'event_label': 'TEXT_COPY'
				});
				break;
			case 'TEXT_SEARCH':
				gtag('event', 'TEXT_SEARCH', {
					'event_category': 'TEXT_SEARCH',
					'event_label': 'TEXT_SEARCH'
				});
				break;
		}
	}, {
		enablePDFAnalytics: true
	});
}

/** To set preview file properties */
function setPreviewFile(adobeDCView, viewerConfig, previewFileConfig) {
	adobeDCView.previewFile({
		content: {
			location: {
				url: previewFileConfig.url
			}
		},
		metaData: {
			fileName: previewFileConfig.fileName
		}
	}, viewerConfig);
}

