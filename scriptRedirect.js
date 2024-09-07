function showLoaderAndRedirect(page) {
    // Show loader
    document.getElementById('loader').style.display = 'flex';

    // Redirect after 0.3 seconds
    setTimeout(function() {
        window.location.href = page;
    }, 300);
}
