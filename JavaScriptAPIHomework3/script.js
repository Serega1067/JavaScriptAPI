window.addEventListener('load', () => {
    renderPhoto();
});

async function getRandomPhoto() {
    const apiKey = '0lk6pJkiN5lGxgbk-NWZocsQSloCc6ktp_e2-R-bpgQ';
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${apiKey}`
        );
        const photo = await response.json();
        return photo;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
        return {};
    }
}

async function renderPhoto() {
    const photo = await getRandomPhoto();
    if (photo) {
        const image = document.querySelector('.image');
        const img = document.createElement('img');
        img.classList.add('img');

        img.src = photo.urls.small;
        img.alt = photo.alt_description;
        image.appendChild(img);

        const titlePhotographerNameDiv = document.querySelector('.title__photographer_name');
        titlePhotographerNameDiv.textContent = `${photo.user.name}`;

        const titleLikesCounterSpan = document.querySelector('.title__likes_counter');
        titleLikesCounterSpan.textContent = `${photo.likes}`;
    }
}

const counterButton = document.querySelector('.title__likes_button');
counterButton.addEventListener('click', function () {
    increaseCounter();
});

function increaseCounter() {
    const likesCounter = document.querySelector('.title__likes_counter');
    const currentCounter = parseInt(likesCounter.textContent, 10);
    likesCounter.textContent = currentCounter + 1;
}