async function loginFormHandler(event) {
    event.preventDefault();
    const searchbar = document.querySelector('search-box').value.trim();
    if (search) {
        const response = await fetch('/dashboard', {
            method: 'post',
            body: JSON.stringify({
                searchbar
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('#searchSubmit').addEventListener('submit', loginFormHandler);