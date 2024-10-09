// Lib Imports.
import axios from 'axios';

// Function to get the infinite query data.
export default async function infiniteScrollQuery({ pageParam }: { pageParam: string }) {
  const response = await axios.get(`/api/projects/get-all/${pageParam || 'first-req'}`);

  return response.data;
}
