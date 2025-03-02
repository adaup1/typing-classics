import { GET } from './route';
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

// Mock the sql module
jest.mock('@vercel/postgres', () => ({
  sql: {
    query: jest.fn(),
  },
}));

describe('Books API', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockBooks = [
    {
      book_id: 1,
      title: 'Test Book',
      title_short: 'Test',
      author_first_name: 'John',
      author_last_name: 'Doe',
      cover_image_url: 'http://example.com/cover.jpg',
      word_count: 1000,
      total_count: 1
    }
  ];

  test('returns books with default parameters', async () => {
    // Mock the SQL query response
    (sql.query as jest.Mock).mockResolvedValue({ rows: mockBooks });

    // Create a mock request
    const request = new Request('http://localhost:3000/api/books');
    
    const response = await GET(request);
    const data = await response.json();

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(data.result).toHaveLength(1);
    expect(data.total).toBe(1);
    expect(sql.query).toHaveBeenCalled();
  });

  test('handles search query parameter', async () => {
    (sql.query as jest.Mock).mockResolvedValue({ rows: mockBooks });

    const request = new Request('http://localhost:3000/api/books?q=test');
    
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.result).toHaveLength(1);
    expect(sql.query).toHaveBeenCalledWith(
      expect.stringContaining('phraseto_tsquery'),
      expect.arrayContaining(['test', expect.any(Number), expect.any(Number)])
    );
  });

  test('handles sort order parameter', async () => {
    (sql.query as jest.Mock).mockResolvedValue({ rows: mockBooks });

    const request = new Request('http://localhost:3000/api/books?sortOrder=lengthDesc');
    
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(sql.query).toHaveBeenCalledWith(
      expect.stringContaining('word_count DESC'),
      expect.any(Array)
    );
  });

  test('handles error cases', async () => {
    (sql.query as jest.Mock).mockRejectedValue(new Error('Database error'));

    const request = new Request('http://localhost:3000/api/books');
    
    const response = await GET(request);
    
    expect(response.status).toBe(500);
  });
}); 