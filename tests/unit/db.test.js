jest.mock('mariadb', () => ({
  createPool: jest.fn(() => ({
    getConnection: jest.fn().mockResolvedValue({
      query: jest.fn().mockResolvedValue({}),
      release: jest.fn(),
    }),
    query: jest.fn(),
    end: jest.fn(),
  })),
}))

const { insertDB } = require('../../src/routes/form')

test('insertDB', async () => {
  const mockQuery = jest.fn()
    .mockResolvedValueOnce([]) // SELECT
    .mockResolvedValueOnce({}) // INSERT

  const mockConn = { query: mockQuery }

  await insertDB(mockConn, 'Alice', 'alice@mail.com')

  expect(mockQuery).toHaveBeenCalledWith(
    'INSERT INTO submissions (name, email) VALUES (?, ?)',
    ['Alice', 'alice@mail.com']
  )
})
