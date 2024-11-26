const UNSPLASH_API_KEY = "enLiBN4iPNeJZT0LRoKjXhHMpdqPOXeqENKywDPPNKg"; // Replace with your Unsplash API key
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const imageResults = document.getElementById("image-results");

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (query) {
    imageResults.innerHTML = `<p class="text-center text-gray-500 col-span-full">Loading...</p>`;
    try {
      const response = await fetch(`${UNSPLASH_API_URL}?query=${query}&per_page=12&client_id=${UNSPLASH_API_KEY}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        imageResults.innerHTML = ""; // Clear previous results
        data.results.forEach(image => {
          const card = document.createElement("div");
          card.className = "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

          card.innerHTML = `
            <img 
              src="${image.urls.small}" 
              alt="${image.alt_description || query}" 
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <p class="text-gray-700 font-semibold">
                ${image.alt_description || "Untitled"}
              </p>
              <a href="${image.links.html}" target="_blank" 
                 class="text-blue-500 text-sm hover:underline">
                View on Unsplash
              </a>
            </div>
          `;
          imageResults.appendChild(card);
        });
      } else {
        imageResults.innerHTML = `<p class="text-center text-gray-500 col-span-full">No results found for "${query}".</p>`;
      }
    } catch (error) {
      imageResults.innerHTML = `<p class="text-center text-red-500 col-span-full">An error occurred. Please try again.</p>`;
      console.error(error);
    }
  } else {
    imageResults.innerHTML = `<p class="text-center text-gray-500 col-span-full">Please enter a search term.</p>`;
  }
});




// hello bangladesh