import { EasterFact } from '../types';

const easterFacts: EasterFact[] = [
  {
    id: 1,
    text: 'The Easter Bunny tradition began in Germany in the 1700s!'
  },
  {
    id: 2,
    text: 'The largest Easter egg ever made was over 7.5 metres tall and weighed over 3,600 kilogrammes!'
  },
  {
    id: 3,
    text: 'The UK consumes more than 80 million chocolate Easter eggs annually!'
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
    text: 'In Finland, children plant grass seeds in small pots to symbolise new life and the coming of spring!',
    country: 'Finland'
  },
  {
    id: 8,
    text: 'The Easter Bunny delivers decorated eggs and chocolate to children while they sleep the night before Easter!'
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
    text: 'The tradition of Easter eggs comes from the ancient idea that eggs represent new life and rebirth!'
  },
  {
    id: 13,
    text: 'In Brazil, they make straw dolls to represent Judas and throw them in the street for children to beat up!',
    country: 'Brazil'
  },
  {
    id: 14,
    text: 'Easter is named after Eostre, the ancient Anglo-Saxon goddess of spring!'
  },
  {
    id: 15,
    text: 'In the UK, there is a custom of rolling decorated eggs down hills on Easter Monday!',
    country: 'United Kingdom'
  },
  {
    id: 16,
    text: 'Hot cross buns are traditionally eaten on Good Friday in the UK!',
    country: 'United Kingdom'
  },
  {
    id: 17,
    text: 'Simnel cake, a fruit cake with layers of marzipan, is a traditional Easter treat in the UK with 11 marzipan balls!',
    country: 'United Kingdom'
  },
  {
    id: 18,
    text: 'The world\'s largest Easter egg hunt took place in London in 2012, with over 12,000 participants searching for eggs!',
    country: 'United Kingdom'
  },
  {
    id: 19,
    text: 'In Scotland, Easter egg painting competitions and egg rolling events are popular community traditions!',
    country: 'United Kingdom'
  },
  {
    id: 20,
    text: 'The British royal family traditionally attends Easter service at St George\'s Chapel in Windsor Castle!',
    country: 'United Kingdom'
  },
  {
    id: 21,
    text: 'In Greece, eggs are dyed red and people play a game called tsougrisma, cracking their eggs against each other\'s!',
    country: 'Greece'
  },
  {
    id: 22,
    text: 'In Greece, traditional Easter bread called tsoureki is baked with red-dyed eggs nestled in the dough!',
    country: 'Greece'
  },
  {
    id: 23,
    text: 'On the Greek island of Corfu, people throw clay pots from their balconies on Easter Saturday!',
    country: 'Greece'
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