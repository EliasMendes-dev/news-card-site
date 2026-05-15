import { sharedStyles } from './shared-styles.js';

class CardNews extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.appendChild(this.build());
        this.shadow.adoptedStyleSheets = [sharedStyles, this.styles()];
    }

    build() {
        const root = document.createElement('li');
        root.classList.add('news-grid-item');

        const card = document.createElement('article');
        card.classList.add('news-card');

        card.appendChild(this.createCardTop());
        card.appendChild(this.createCardBottom());

        root.appendChild(card);

        return root;
    }

    createCardTop() {
        const cardTop = document.createElement('div');
        cardTop.classList.add('card-top');

        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');

        const image = document.createElement('img');

        image.src =
            this.getAttribute('photo') ||
            'assets/foto-default.jpg';

        image.alt =
            `${this.getAttribute('title') || 'News'} - image`;

        cardImage.appendChild(image);
        cardTop.appendChild(cardImage);

        return cardTop;
    }

    createCardBottom() {
        const cardBottom = document.createElement('div');
        cardBottom.classList.add('card-bottom');

        cardBottom.appendChild(this.createMeta());
        cardBottom.appendChild(this.createContent());
        cardBottom.appendChild(this.createActions());

        return cardBottom;
    }

    createMeta() {
        const meta = document.createElement('div');
        meta.classList.add('card-meta');

        const author = document.createElement('p');
        author.classList.add('card-author');

        author.textContent =
            this.getAttribute('author') || 'Anonymous';

        const date = document.createElement('p');
        date.classList.add('card-date');

        const currentDate =
            this.getAttribute('date') ||
            new Date().toISOString().split('T')[0];

        date.innerHTML = `
            <time datetime="${currentDate}">
                ${new Date(currentDate).toLocaleDateString()}
            </time>
        `;

        meta.appendChild(author);
        meta.appendChild(date);

        return meta;
    }

    createContent() {
        const content = document.createElement('div');
        content.classList.add('card-content');

        const title = document.createElement('h3');
        title.classList.add('card-title');

        title.textContent =
            this.getAttribute('title') || 'Untitled';

        const description = document.createElement('p');
        description.classList.add('card-description');

        description.textContent =
            this.getAttribute('content') ||
            'No content available';

        content.appendChild(title);
        content.appendChild(description);

        return content;
    }

    createActions() {
        const actions = document.createElement('div');
        actions.classList.add('card-actions');

        const readMore = document.createElement('button');
        readMore.classList.add('read-more');
        readMore.type = 'button';
        readMore.textContent = 'Leia Mais';

        const trash = document.createElement('button');
        trash.classList.add('trash');
        trash.type = 'button';

        trash.innerHTML = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M3 6h18" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4h6v2" />
            </svg>
        `;

        actions.appendChild(readMore);
        actions.appendChild(trash);

        return actions;
    }

    // Button trash apagando o card
    connectedCallback() {
        const trashButton = this.shadow.querySelector('.trash');
        trashButton.addEventListener('click', () => {
            this.remove();
        });
    }

        styles() {
            const sheet = new CSSStyleSheet();

            sheet.replaceSync(`
        :host {
            display: block;
        }

        .news-card {
            border-radius: 10px;
            width: 100%;
            border: 1px solid var(--color-border);
            margin-top: 20px;
            overflow: hidden;
            transition: all 0.3s ease;
            gap: 20px;
        }

        .news-card:hover {
            box-shadow: inset 0 -6px 0 var(--color-accent);
            border-color: var(--color-accent);
        }
        
        .card-top {
            width: 100%;
        }

        .card-image {
            width: 100%;
            height: 200px;
        }

        .card-image>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-bottom {
            color: var(--color-text);
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .card-meta {
            display: flex;
            flex-direction: row;
            gap: 30px;
        }

        .card-author,
        .card-date {
            font-size: 0.75rem;
            opacity: 0.5;
            font-weight: 300;
        }

        .card-author>i,
        .card-date>i {
            margin-right: 5px;
        }

        .card-title {
            font-size: 1.7rem;
            font-weight: bold;
            margin: 10px 0;
            color: var(--color-accent);
        }

        .card-content {
            display: block;
        }

        .card-description {
            font-size: 0.875rem;
            line-height: 1.5;
            opacity: 0.6;
            font-weight: 300;
            margin: 10px 0;
            display: -webkit-box;
            line-clamp: 3;
            -webkit-line-clamp: 3;
            -webkit-line-clamp-color: var(--color-text);
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .card-actions {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .read-more {
            background-color: transparent;
            color: var(--color-border);
            border: none;
            border-radius: 10px;
            font-size: 0.8rem;
            cursor: pointer;
            outline: none;
        }

        .read-more>i {
            margin-left: 7px;
            font-size: 0.75rem;
        }

        .read-more:hover {
            color: var(--color-accent);
        }

        .trash {
            background-color: transparent;
            color: var(--color-border);
            padding: 8px 12px;
            border: none;
            font-size: 0.875rem;
            cursor: pointer;
            outline: none;
        }

        .trash:hover {
            color: var(--color-accent);
        }

        @media (min-width: 960px) {

            .news-card {
                display: flex;
                flex-direction: row;
                height: 280px;
            }

            .news-card:hover {
                box-shadow: inset -6px 0 0 var(--color-accent);
            }

            .card-top {
                width: 40%;
            }

            .card-bottom {
                width: 60%;
                padding: 40px 20px;
            }

            .card-image {
                height: 100%;
            }

        }
    `);

            return sheet;
        }
    }

customElements.define('card-news', CardNews);