angular.module('starter.services')

.service('Locations', function() {
  var Locations = {};

  Locations.countries = function() {
    return [
      { id: "ca", name: "Canada" },
      { id: "us", name: "United States" },
      { id: 'ar', name: 'Argentina' },
      { id: 'au', name: 'Australia' },
      { id: 'at', name: 'Austria' },
      { id: 'be', name: 'Belgium' },
      { id: 'br', name: 'Brazil' },
      { id: 'cl', name: 'Chile' },
      { id: 'cr', name: 'Costa Rica' },
      { id: 'hr', name: 'Croatia' },
      { id: 'cz', name: 'Czech Republic' },
      { id: 'dk', name: 'Denmark' },
      { id: 'fi', name: 'Finland' },
      { id: 'fr', name: 'France' },
      { id: 'de', name: 'Germany' },
      { id: 'gb', name: 'Great Britain' },
      { id: 'el', name: 'Greece' },
      { id: 'hu', name: 'Hungary' },
      { id: 'is', name: 'Iceland' },
      { id: 'ie', name: 'Ireland' },
      { id: 'it', name: 'Italy' },
      { id: 'jp', name: 'Japan' },
      { id: 'li', name: 'Liechtenstein' },
      { id: 'lt', name: 'Lithuania' },
      { id: 'mx', name: 'Mexico' },
      { id: 'ma', name: 'Morocco' },
      { id: 'nl', name: 'Netherlands' },
      { id: 'nz', name: 'New Zealand' },
      { id: 'no', name: 'Norway' },
      { id: 'ph', name: 'Philippines' },
      { id: 'pl', name: 'Poland' },
      { id: 'pt', name: 'Portugal' },
      { id: 'ro', name: 'Romania' },
      { id: 'sg', name: 'Singapore' },
      { id: 'sk', name: 'Slovakia' },
      { id: 'si', name: 'Slovenia' },
      { id: 'za', name: 'South Africa' },
      { id: 'es', name: 'Spain' },
      { id: 'se', name: 'Sweden' },
      { id: 'ch', name: 'Switzerland' },
      { id: 've', name: 'Venezuela' },
      { id: 'vi', name: 'Vietnam' },
      { id: 'other', name: 'Other' }
    ]
  }

  Locations.provinces = function() {
    return [
      { id: "bc", name: "British Columbia" },
      { id: "ab", name: "Alberta" },
      { id: 'sk', name: 'Saskatchewan' },
      { id: 'mb', name: 'Manitoba' },
      { id: 'on', name: 'Ontario' },
      { id: 'qc', name: 'Quebec' },
      { id: 'nb', name: 'New Brunswick' },
      { id: 'ns', name: 'Nova Scotia' },
      { id: 'pe', name: 'Prince Edward Island' },
      { id: 'nl', name: 'Newfoundland and Labrador' },
      { id: 'other', name: 'Other' }
    ]
  }

  Locations.states = function() {
    return [
      { id: 'al', name: 'Alabama' },
      { id: 'ak', name: 'Alaska' },
      { id: 'az', name: 'Arizona' },
      { id: 'ar', name: 'Arkansas' },
      { id: 'ca', name: 'California' },
      { id: 'co', name: 'Colorado' },
      { id: 'ct', name: 'Connecticut' },
      { id: 'de', name: 'Delaware' },
      { id: 'fl', name: 'Florida' },
      { id: 'ga', name: 'Georgia' },
      { id: 'hi', name: 'Hawaii' },
      { id: 'id', name: 'Idaho' },
      { id: 'il', name: 'Illinois' },
      { id: 'in', name: 'Indiana' },
      { id: 'ia', name: 'Iowa' },
      { id: 'ks', name: 'Kansas' },
      { id: 'ky', name: 'Kentucky' },
      { id: 'la', name: 'Louisiana' },
      { id: 'me', name: 'Maine' },
      { id: 'md', name: 'Maryland' },
      { id: 'ma', name: 'Massachusetts' },
      { id: 'mi', name: 'Michigan' },
      { id: 'mn', name: 'Minnesota' },
      { id: 'ms', name: 'Mississippi' },
      { id: 'mo', name: 'Missouri' },
      { id: 'mt', name: 'Montana' },
      { id: 'ne', name: 'Nebraska' },
      { id: 'nv', name: 'Nevada' },
      { id: 'nh', name: 'New Hampshire' },
      { id: 'nj', name: 'New Jersey' },
      { id: 'nm', name: 'New Mexico' },
      { id: 'ny', name: 'New York' },
      { id: 'nc', name: 'North Carolina' },
      { id: 'nd', name: 'North Dakota' },
      { id: 'oh', name: 'Ohio' },
      { id: 'ok', name: 'Oklahoma' },
      { id: 'or', name: 'Oregon' },
      { id: 'pa', name: 'Pennsylvania' },
      { id: 'ri', name: 'Rhode Island' },
      { id: 'sc', name: 'South Carolina' },
      { id: 'sd', name: 'South Dakota' },
      { id: 'tn', name: 'Tennessee' },
      { id: 'tx', name: 'Texas' },
      { id: 'ut', name: 'Utah' },
      { id: 'vt', name: 'Vermont' },
      { id: 'va', name: 'Virginia' },
      { id: 'wa', name: 'Washington' },
      { id: 'wv', name: 'West Virginia' },
      { id: 'wi', name: 'Wisconsin' },
      { id: 'wy', name: 'Wyoming' },
      { id: 'other', name: 'Other' }
    ]
  }

  return Locations;
})