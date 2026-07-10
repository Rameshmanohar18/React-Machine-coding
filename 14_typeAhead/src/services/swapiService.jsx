const GITHUB_API_URL = 'https://api.github.com/search/users';

export const fetchUsers = async (query, signal) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}?q=${query}`, {
      signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    throw error;
  }
};
