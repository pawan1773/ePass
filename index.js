/* global variable to store file type */
var fileCategory = '';

/* wait for document to get ready */
$(document).ready(function () {
	/* activate materialize side nav in mobile view */
	$('.sidenav').sidenav();

	/* activate materialize tooltip */
	$('.tooltipped').tooltip();

	/* handle home click in header and side nav */
	$('.home-link').click(function () {
		$("#home-container").show();
		$("#content-container").hide();
	});

	/* handle content click in header and side nav */
	$('.content-link').click(function () {
		$("#home-container").hide();
		$("#content-container").show();
	});

	/* handle view PDF click */
	$(".view-pdf").click(function () {
		$('#home-container').hide();
		$('#content-container').show();
		$('#mode-btn-container').show();

		if ($(this).hasClass('emb-btn')) {
			$(this).addClass('disabled');
			$(this).siblings().removeClass('disabled');
		} else {
			$('#btn-sized').addClass('disabled').siblings().removeClass('disabled');
		}

		var temp = $(this).data("file-category");
		if (typeof temp !== 'undefined' && temp !== null && temp !== '') {
			fileCategory = temp;
		}

		var previewFileConfig = '';
		for (var i = 0; i < FILE_CONFIG.length; i++) {
			if (FILE_CONFIG[i].fileCategory === fileCategory) {
				previewFileConfig = FILE_CONFIG[i];
				break;
			}
		}

		var embedMode = $(this).data("embed-mode");
		var divId = '';
		if (embedMode === 'SIZED_CONTAINER') {
			divId = 'adobe-dc-sized-container';
			$('#adobe-dc-sized-container').show();
			$('#adobe-dc-sized-container').siblings().hide();
		} else if (embedMode === 'FULL_WINDOW') {
			divId = 'adobe-dc-full-window';
			$('#adobe-dc-full-window').show();
			$('#adobe-dc-full-window').siblings().hide();
		} else {
			divId = 'adobe-dc-in-line';
			$('#adobe-dc-in-line').show();
			$('#adobe-dc-in-line').siblings().hide();
		}

		/* setup viewer configurations */
		const viewerConfig = {
			"defaultViewMode": "FIT_PAGE",
			"embedMode": embedMode
		};

		/* setup client id and div to display */
		var adobeDCView = new AdobeDC.View({
			clientId: CLIENT_ID,
			divId: divId
		});

		setPreviewFile(adobeDCView, viewerConfig, previewFileConfig);
		postEventsToGoogleAnalytics(adobeDCView);
	})
});

/** 
 * To listen to file events and send it to google analytics 
 *
 * @param adobeDCView
 */
function postEventsToGoogleAnalytics(adobeDCView) {
	adobeDCView.registerCallback(AdobeDC.View.Enum.CallbackType.EVENT_LISTENER, (e) => {
		switch (e.type) {
			case 'DOCUMENT_OPEN':
				gtag('event', 'DOCUMENT_OPEN', {
					'event_category': 'DOCUMENT_OPEN',
					'event_label': 'DOCUMENT_OPEN'
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

/** 
 * To set preview file properties 
 *
 * @param adobeDCView
 * @param viewerConfig
 * @param previewFileConfig
 */
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

