import { EasterFact } from '../types';

const easterFacts: EasterFact[] = [
  {
    id: 1,
    text: 'The Easter Bunny tradition began in Germany in the 1700s!'
  },
  {
    id: 2,
    text: 'The largest Easter egg ever made was over 25 feet tall and weighed over 8,000 pounds!'
  },
  {
    id: 3,
    text: 'Americans buy more than 700 million marshmallow Peeps during Easter!'
  },
  {
    id: 4,
    text: 'In Sweden, children dress up as Easter witches and go door-to-door for treats!',
    country: 'Sweden'
  },
  {
    id: 5,
    text: 'The White House Easter Egg Roll has been a tradition since 1878!',
    country: 'United States'
  },
  {
    id: 6,
    text: 'In Norway, Easter is a popular time for reading crime novels! It\'s called "Påskekrim"!',
    country: 'Norway'
  },
  {
    id: 7,
    text: 'In Finland, children plant grass seeds in small pots to symbolize new life and the coming of spring!',
    country: 'Finland'
  },
  {
    id: 8,
    text: 'The Easter Bunny delivers decorated eggs and candy to children while they sleep the night before Easter!'
  },
  {
    id: 9,
    text: 'In Australia, they have the Easter Bilby instead of the Easter Bunny!',
    country: 'Australia'
  },
  {
    id: 10,
    text: 'Easter Island isn\'t named for the holiday - it was discovered by a Dutch explorer on Easter Sunday 1722!'
  },
  {
    id: 11,
    text: 'In France, church bells are said to fly to Rome on Good Friday and return on Easter Sunday dropping chocolates for children!',
    country: 'France'
  },
  {
    id: 12,
    text: 'The tradition of Easter eggs comes from the old idea that eggs represent new life!'
  },
  {
    id: 13,
    text: 'In Brazil, they make straw dolls to represent Judas and throw them in the street for children to beat up!',
    country: 'Brazil'
  },
  {
    id: 14,
    text: 'Easter is named after Eostre, the ancient German goddess of spring!'
  },
  {
    id: 15,
    text: 'In Hungary, boys sprinkle girls with perfume or water on Easter Monday, and in return, girls prepare meals and give painted eggs!',
    country: 'Hungary'
  }
];

// Get a random Easter fact
export const getRandomFact = (): EasterFact => {
  const randomIndex = Math.floor(Math.random() * easterFacts.length);
  return easterFacts[randomIndex];
};

// Get a fact for a specific country if available
export const getFactForCountry = (country: string): EasterFact | null => {
  const countryFacts = easterFacts.filter(fact => fact.country === country);
  
  if (countryFacts.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * countryFacts.length);
  return countryFacts[randomIndex];
};