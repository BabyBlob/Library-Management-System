import axios from 'axios';

const Url = 'http://localhost:5555';

export const fetchLogs = async (book_ID) => {
  try {
    const endpoint = book_ID 
      ? `${Url}/Book/Lending/logs/${book_ID}`
      : `${Url}/Book/Lending/logs`;
    
    const response = await axios.get(endpoint);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch logs');
  }
};

export const filterLogs = (logs, searchTerm) => {
  if (!searchTerm) return logs;
  return logs.filter(log => 
    log.book_ID.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};