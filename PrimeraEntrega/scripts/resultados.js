document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const results = document.querySelector('.search-results');
    const noResults = document.querySelector('.no-results');
    noResults.style.display = 'block'; 
});