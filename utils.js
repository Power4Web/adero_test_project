// Fonction pour filtrer les données selon un pattern
/**
 * Main function for filter data according to a pattern
 * @param data array country
 * @param pattern string for search animals
 * @returns the data array containing only countries and
 * people with animal names matching the pattern or empty string
 */
function filterData(data, pattern) {
  const dataTemp = data.reduce((acc, country) => {
    const filteredPeople = country.people.reduce((peopleAcc, person) => {
      const filteredAnimals = person.animals.filter((animal) => animal.name.toLowerCase().includes(pattern));
      if (filteredAnimals.length > 0) {
        peopleAcc.push({...person, animals: filteredAnimals});
      }
      return peopleAcc;
    }, []);

    if (filteredPeople.length > 0) {
      acc.push({ ...country, people: filteredPeople});
    }

    return acc;
  }, []);
  return dataTemp.length > 0 ? dataTemp : '';
}

/**
 * Main function for counting
 * @param data array country
 * @returns Array containing country objects 
 * with the names of the countries and people completed with their count
 */
function countData(data) {
  return data.reduce((acc, country) => {
    acc.push(countPeopleForCountry(country));
    return acc;
  }, []);
}

/**
 * To count a person's pets and format their name
 * @param person object of type { name:string, animals:array}
 * @returns Object containing name mofier with the counter
 * and animals of an array of animals : {name:string, animals: Animals[]}
 * I specify Animals even if we are not in typescipt here
 */
function countAnimalsForPerson(person) {
  return {
    name: `${person.name} [${person.animals.length}]`,
    animals: person.animals,
  };
}

/**
 * To count people in a country and format its name
 * @param country object of type { name:string, people:array}
 * @returns Object containing name mofier with the counter
 * and people of an array of animals : {name:string, people: Person[]}
 * I specify Person even if we are not in typescipt here
 */
function countPeopleForCountry(country) {
  const people = country.people.reduce((acc, person) => {
    acc.push(countAnimalsForPerson(person));
    return acc;
  }, []);

  return {
    name: `${country.name} [${country.people.length}]`,
    people,
  };
}

module.exports = { filterData, countData, countPeopleForCountry, countAnimalsForPerson };
