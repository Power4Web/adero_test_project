const { countData, countPeopleForCountry, countAnimalsForPerson, filterData } = require('./utils');

const samplePerson = {
  name: 'Winifred Graham',
  animals: [
    { name: 'Anoa' },
    { name: 'Duck' },
  ],
};

const sampleCountry = {
  name: 'Dillauti',
  people: [
    { name: 'Winifred Graham', animals: [{ name: 'Anoa' }, { name: 'Duck' }] },
    { name: 'Blanche Viciani', animals: [{ name: 'Barbet' }] },
  ],
};

const sampleData = [
  {
    name: 'Uzuzozne',
    people: [
      {
        name: 'Lillie Abbott',
        animals: [
          { name: 'John Dory' },
          { name: 'Orix' },
        ],
      },
    ],
  },
  {
    name: 'Dillauti',
    people: [
      {
        name: 'Blanche Viciani',
        animals: [
          { name: 'Barbet' },
          { name: 'Crow' },
        ],
      },
    ],
  },
];

describe('Utils Functions', () => {
  test('countAnimalsForPerson should return the person with animals count in name', () => {
    const result = countAnimalsForPerson(samplePerson);
    expect(result).toEqual({
      name: 'Winifred Graham [2]',
      animals: [
        { name: 'Anoa' },
        { name: 'Duck' },
      ],
    });
  });

  test('countPeopleForCountry should return the country with people count in name', () => {
    const result = countPeopleForCountry(sampleCountry);
    expect(result).toEqual({
      name: 'Dillauti [2]',
      people: [
        {
          name: 'Winifred Graham [2]',
          animals: [
            { name: 'Anoa' },
            { name: 'Duck' },
          ],
        },
        {
          name: 'Blanche Viciani [1]',
          animals: [{ name: 'Barbet' }],
        },
      ],
    });
  });

  test('countData should return the countries with people and animals counts', () => {
    const result = countData(sampleData);
    expect(result[0].name).toBe('Uzuzozne [1]');
    expect(result[0].people[0].name).toBe('Lillie Abbott [2]');
  });

  test('filterData should filter animals matching the pattern and exclude empty entries', () => {
    const result = filterData(sampleData, 'ry');
    expect(result).toEqual([
      {
        name: 'Uzuzozne',
        people: [
          {
            name: 'Lillie Abbott',
            animals: [{ name: 'John Dory' }],
          },
        ],
      },
    ]);
  });

  test('filterData should return an empty if no matches are found', () => {
    const result = filterData(sampleData, 'xyz');
    expect(result).toBe('');
  });
});
