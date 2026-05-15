const newsForm = document.querySelector('news-form');

if (newsForm) {
    document.addEventListener('open-news-form', () => {
        newsForm.open();
    });

    newsForm.addEventListener('news-form-submitted', (event) => {
        const { title, author, content, image } = event.detail;
        console.log('Nova notícia enviada:', { title, author, content, image });
    });
}

