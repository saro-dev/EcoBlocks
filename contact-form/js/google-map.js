let map;
    let placeNameContainer;

    function initMap() {
        map = new Microsoft.Maps.Map('#map', {
            credentials: 'AkYWB8gJ_01j2NdrW17u1t-Qj0b1Bbgi3S3A2zv2RLypHNDeLEG9tyuFK74JtWBg',
            center: new Microsoft.Maps.Location(27.6847, 85.3199), // Kathmandu coordinates
            zoom: 12
        });

        searchPlace("Opposite Imperial Towers, Sanepa, Kathmandu");
    }

    function searchPlace(address) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            const searchManager = new Microsoft.Maps.Search.SearchManager(map);

            const requestOptions = {
                where: address,
                callback: function (answer, userData) {
                    if (answer && answer.results && answer.results.length > 0) {
                        const firstResult = answer.results[0];
                        const location = firstResult.location;

                        map.setView({ center: location });
                        
                        const pin = new Microsoft.Maps.Pushpin(location);
                        map.entities.push(pin);

                        const placeName = firstResult.name;
                        showPlaceName(placeName);
                    } else {
                        alert('No results found.');
                    }
                }
            };

            searchManager.geocode(requestOptions);
        });
    }

    function showPlaceName(name) {
        placeNameContainer = document.getElementById('placeNameContainer');
        placeNameContainer.innerHTML = name;
        placeNameContainer.style.visibility = 'visible';
    }

    function clearSearchResults() {
        map.entities.clear();
        placeNameContainer.innerHTML = '';
        placeNameContainer.style.visibility = 'hidden';
    }