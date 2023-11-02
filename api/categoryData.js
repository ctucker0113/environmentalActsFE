const dbUrl = 'https://localhost:7195';

// GET ALL CATEGORIES
const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { getCategories };
