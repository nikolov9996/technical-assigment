const {
  OFFICE_LATITUDE,
  OFFICE_LONGITUDE,
  EARTH_RADIUS,
} = require("./constants");

const partners = require("./partners.json");

const officeLatitudeRadians = degreesToRadians(OFFICE_LATITUDE);
const officeLongitudeRadians = degreesToRadians(OFFICE_LONGITUDE);

function degreesToRadians(degrees = 0) {
  if (!degrees || typeof degrees !== "number") {
    throw new Error("degrees value expected");
  }
  return (degrees * Math.PI) / 180;
}

function calculateDistance(hav, earthRadius) {
  if (!hav || typeof hav !== "number") {
    throw new Error("input must be valid number");
  }
  return Number((2 * Math.asin(Math.sqrt(hav)) * earthRadius).toFixed(0));
}

function haversineFormula(lat = 0, lon = 0) {
  if (!lon || !lat) {
    throw new Error("expecting latitude and longitude properties ");
  }
  const locationLatitudeRadians = degreesToRadians(Number(lat));
  const locationLongitudeRadians = degreesToRadians(Number(lon));

  const latitudeRadians = locationLatitudeRadians - officeLatitudeRadians;
  const longitudeRadians = locationLongitudeRadians - officeLongitudeRadians;

  const hav =
    Math.pow(Math.sin(latitudeRadians / 2), 2) +
    Math.cos(officeLatitudeRadians) *
      Math.cos(locationLatitudeRadians) *
      Math.pow(Math.sin(longitudeRadians / 2), 2);

  return calculateDistance(hav, EARTH_RADIUS);
}

function guestsToInvite(partners) {
  if (typeof partners !== "object") {
    throw new Error("partners must be array of objects");
  }

  let invitedPartners = [];

  for (let i = 0; i < partners.length; i++) {
    const partner = partners[i];
    const { latitude, longitude } = partner;
    const distance = haversineFormula(latitude, longitude);
    if (distance && distance <= 100) invitedPartners.push(partner);
  }
  invitedPartners.sort((a, b) => a.partner_id - b.partner_id);

  const result = invitedPartners.map(
    (partner) => `${partner.name}, ${partner.partner_id}`
  );

  return result;
}

console.log(guestsToInvite(partners));

module.exports.degreesToRadians = degreesToRadians;
module.exports.calculateDistance = calculateDistance;
module.exports.haversineFormula = haversineFormula;
module.exports.guestsToInvite = guestsToInvite;
