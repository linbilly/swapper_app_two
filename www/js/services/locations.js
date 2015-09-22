angular.module('starter.services')

.service('Locations', function() {
  var Locations = {};

  Locations.countries = function() {
    return [
      { name: "Canada",         id: "ca" },
      { name: "United States",  id: "us" },
      { name: 'Argentina',      id: 'ar' },
      { name: 'Australia',      id: 'au' },
      { name: 'Austria',        id: 'at' },
      { name: 'Belgium',        id: 'be' },
      { name: 'Brazil',         id: 'br' },
      { name: 'Chile',          id: 'cl' },
      { name: 'Costa Rica',     id: 'cr' },
      { name: 'Croatia',        id: 'hr' },
      { name: 'Czech Republic', id: 'cz' },
      { name: 'Denmark',        id: 'dk' },
      { name: 'Finland',        id: 'fi' },
      { name: 'France',         id: 'fr' },
      { name: 'Germany',        id: 'de' },
      { name: 'Great Britain',  id: 'gb' },
      { name: 'Greece',         id: 'el' },
      { name: 'Hungary',        id: 'hu' },
      { name: 'Iceland',        id: 'is' },
      { name: 'Ireland',        id: 'ie' },
      { name: 'Italy',          id: 'it' },
      { name: 'Japan',          id: 'jp' },
      { name: 'Liechtenstein',  id: 'li' },
      { name: 'Lithuania',      id: 'lt' },
      { name: 'Mexico',         id: 'mx' },
      { name: 'Morocco',        id: 'ma' },
      { name: 'Netherlands',    id: 'nl' },
      { name: 'New Zealand',    id: 'nz' },
      { name: 'Norway',         id: 'no' },
      { name: 'Philippines',    id: 'ph' },
      { name: 'Poland',         id: 'pl' },
      { name: 'Portugal',       id: 'pt' },
      { name: 'Romania',        id: 'ro' },
      { name: 'Singapore',      id: 'sg' },
      { name: 'Slovakia',       id: 'sk' },
      { name: 'Slovenia',       id: 'si' },
      { name: 'South Africa',   id: 'za' },
      { name: 'Spain',          id: 'es' },
      { name: 'Sweden',         id: 'se' },
      { name: 'Switzerland',    id: 'ch' },
      { name: 'Venezuela',      id: 've' },
      { name: 'Vietnam',        id: 'vi' },
      { name: 'Other',          id: 'other' }
    ]
  }

  return Locations;
})