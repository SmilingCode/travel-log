const API_URL = "http://localhost:1337";

export const getAllLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
};

export const getAllRatings = async () => {
  const response = await fetch(`${API_URL}/api/ratings`);
  return response.json();
}

export const createLogEntries = async (entries) => {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(entries),
  });

  return response.json();
}