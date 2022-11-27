const searchForm = document.getElementById('search-form')
const searchField = document.getElementById('search-field');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = searchField.value;

  window.location = `/weather?search=${location}`
});