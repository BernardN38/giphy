const API_KEY = 'PQAmIsKWKCxEhxIYPiwETZ9VkJD9vnyx';

$('#search-btn').on('click', function() {
	const searchTerm = $('#search-input').val();
	searchGiphy(searchTerm);
});

$('#delete-btn').on('click', function() {
	$('#gif-container').empty();
	$('#search-input').val('');
});

async function searchGiphy(searchTerm) {
	const params = { api_key: API_KEY, q: searchTerm };
	const res = await axios.get('https://api.giphy.com/v1/gifs/search', { params });
	randomId = findRandomGif(res.data.data);
	appendGif(randomId);
}

async function findGifById(gifId) {
	const params = { api_key: API_KEY };
	const response = await axios.get(`https://api.giphy.com/v1/gifs/${gifId}`, { params });
	const gifUrl = response.data.data.embed_url;
	return gifUrl;
}

async function appendGif(gifId) {
	const gifUrl = await findGifById(gifId);
	$('#gif-container').append(`<iframe src=${gifUrl}></iframe>`);
}

function findRandomGif(searchList) {
	const randomItem = Math.floor(Math.random() * 50);
	return searchList[randomItem].id;
}
