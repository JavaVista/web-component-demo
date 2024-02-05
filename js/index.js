import API from './api-service.js';

// component initialization and data fetch
// let searchInitiated = false;
// // Wait for the custom elements to be defined
// customElements.whenDefined('search-input-component').then(() => {
//     const searchInput = document.querySelector('search-input-component');
//     const characterCard = document.querySelector('character-card-component');
    

//     // Event listener for the 'search' event from search-input-component
//     searchInput.addEventListener('search', async (event) => {
//         searchInitiated = true;
//         const searchTerm = event.detail;
//         try {
//             // Fetch the character data using the search term
//             const jsonData = await API.fetchCharacter(searchTerm);
//             if (!jsonData || !jsonData.data || !jsonData.data.results) {
//                 throw new Error('Invalid API response');
//             }
//             // Set the first result to the character property of character-card-component
//             characterCard.character = jsonData.data.results[0];
//         } catch (error) {
//             console.error('Error fetching character data:', error);
//             characterCard.setError('No characters found or there was an error fetching character data.');
//         }
//     });
// });
