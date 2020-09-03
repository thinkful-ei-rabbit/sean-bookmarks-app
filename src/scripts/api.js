'use_strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/seanM';

function deleteBookmark(id) {
  return fetchRequest(`${BASE_URL}/bookmarks/${id}`, {method:'DELETE'});
};

function createBookmark(newBookmark) {
  return fetchRequest(`${BASE_URL}/bookmarks`,
    {
      method:'POST',
      headers:
      {
        'Content-Type': 'application/json'
      }, 
      body: newBookmark
    });
};

function updateBookmark(id, newBookmarkData) {
  return fetchRequest(`${BASE_URL}/bookmarks/${id}`,
    {
      method:'PATCH',
      headers:
    {
      'Content-Type': 'application/json'
    }, 
      body: newBookmarkData
    });
};

function getBookmarks() {
  return fetchRequest(`${BASE_URL}/bookmarks`);
};

function fetchRequest(...args) {
  let error;
  return fetch(...args)
    .then(results => {
      if (!results.ok) {
        error = { code: results.status };
        if (!results.headers.get('content-type').includes('json')) {
          error.message = results.statusText;
          return Promise.reject(error);
        }
      }
      return results.json();
    })
    .then(data =>{
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark
};
