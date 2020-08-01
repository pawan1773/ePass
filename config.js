/* change suffix if you are placing pdf files in some other directory */
const domain = 'https://' + location.hostname + '/ePass/pdf/';

const FILE_CONFIG = [{
	"id": 1,
	"url": domain + "personal.pdf",
	"fileName": "PERSONAL_INFORMATION.pdf",
	"fileCategory": "PERSONAL INFORMATION"
}, {
	"id": 2,
	"url": domain + "vehicle.pdf",
	"fileName": "VEHICLE_DETAILS.pdf",
	"fileCategory": "VEHICLE DETAILS"
}, {
	"id": 3,
	"url": domain + "medical.pdf",
	"fileName": "MEDICAL_CERTIFICATE.pdf",
	"fileCategory": "MEDICAL CERTIFICATE"
}, {
	"id": 4,
	"url": domain + "pcc.pdf",
	"fileName": "POLICE_CLEARANCE.pdf",
	"fileCategory": "POLICE CLEARANCE"
}, {
	"id": 5,
	"url": domain + "declaration.pdf",
	"fileName": "SELF_DECLARATION.pdf",
	"fileCategory": "SELF DECLARATION"
}];

/* client id for sdk view */
const CLIENT_ID = "c7a56ca659ad4725b3ccacd3849b4e54";