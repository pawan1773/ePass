const domain = 'https://' + location.hostname;

const FILE_CONFIG = [{
	"url": domain + "/ePass/pdf/personal.pdf",
	"fileName": "PERSONAL_INFORMATION.pdf",
	"fileCategory": "PERSONAL INFORMATION"
}, {
	"url": domain + "/ePass/pdf/vehicle.pdf",
	"fileName": "VEHICLE_DETAILS.pdf",
	"fileCategory": "VEHICLE DETAILS"
}, {
	"url": domain + "/ePass/pdf/medical.pdf",
	"fileName": "MEDICAL_CERTIFICATE.pdf",
	"fileCategory": "MEDICAL CERTIFICATE"
}, {
	"url": domain + "/ePass/pdf/pcc.pdf",
	"fileName": "POLICE_CLEARANCE.pdf",
	"fileCategory": "POLICE CLEARANCE"
}, {
	"url": domain + "/ePass/pdf/declaration.pdf",
	"fileName": "SELF_DECLARATION.pdf",
	"fileCategory": "SELF DECLARATION"
}];

/* client id for sdk view */
const CLIENT_ID = "c7a56ca659ad4725b3ccacd3849b4e54";