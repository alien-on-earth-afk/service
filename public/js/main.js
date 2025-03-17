// Location Detection
document.getElementById('locationInput').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    document.getElementById('locationInput').value = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
}

function showError(error) {
    alert("Error getting location: " + error.message);
}
