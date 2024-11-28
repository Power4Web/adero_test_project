const { actions } = require('./actions');
const { filterData, countData } = require('./utils');

jest.mock('./utils', () => ({
  filterData: jest.fn(),
  countData: jest.fn(),
}));

describe('Actions', () => {
  const mockData = [
    {
      name: 'Uzuzozne',
      people: [
        { name: 'Lillie Abbott', animals: [{ name: 'John Dory' }, { name: 'Oryx' }] },
      ],
    },
    {
      name: 'Satanwi',
      people: [
        { name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] },
      ],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('`--count` action should call countData with data and log the result', () => {
    const mockCountedData = [
      { name: 'Uzuzozne [1]', people: [{ name: 'Lillie Abbott [2]', animals: [] }] },
    ];
    countData.mockReturnValue(mockCountedData);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    actions['--count'](mockData);
    expect(countData).toHaveBeenCalledWith(mockData);
    expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(mockCountedData, null, 2));

    consoleLogSpy.mockRestore();
  });

  test('`--filter` action should call filterData with data and pattern, then log the result', () => {
    const mockFilteredData = [
      {
        name: 'Uzuzozne',
        people: [{ name: 'Lillie Abbott', animals: [{ name: 'John Dory' }] }],
      },
    ];
    filterData.mockReturnValue(mockFilteredData);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    actions['--filter'](mockData, 'ry');
    expect(filterData).toHaveBeenCalledWith(mockData, 'ry');
    expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(mockFilteredData, null, 2));

    consoleLogSpy.mockRestore();
  });

  test('`--filter` action should throw an error and exit when pattern is missing', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    actions['--filter'](mockData);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Please provide a valid pattern for --filter.');
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
