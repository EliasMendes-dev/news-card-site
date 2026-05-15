import { sharedStyles } from './shared-styles.js';

class SiteHeader extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.appendChild(this.createHeader());
        this.shadow.adoptedStyleSheets = [sharedStyles, this.styles()];
    }

    createHeader() {
        const header = document.createElement('header');
        header.classList.add('site-header');

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('content-wrapper');

        header.appendChild(contentWrapper);

        contentWrapper.appendChild(this.createBrand());
        contentWrapper.appendChild(this.createActions());

        return header;
    }

    createBrand() {
        const siteBrand = document.createElement('div');
        siteBrand.classList.add('site-brand');
        siteBrand.setAttribute('aria-label', 'Impus');

        const brandIcon = document.createElement('div');
        brandIcon.classList.add('brand-icon');
        brandIcon.setAttribute('aria-hidden', 'true');

        brandIcon.innerHTML = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M15 18h-5" />
                <path d="M18 14h-8" />
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="10" y="6" rx="1" />
            </svg>
        `;

        const brandText = document.createElement('div');
        brandText.classList.add('brand-text');

        const brandTitle = document.createElement('p');
        brandTitle.classList.add('brand-title');
        brandTitle.textContent = 'Impus';

        const brandSubtitle = document.createElement('p');
        brandSubtitle.classList.add('brand-subtitle');
        brandSubtitle.textContent = 'Portal de Noticias';

        brandText.appendChild(brandTitle);
        brandText.appendChild(brandSubtitle);

        siteBrand.appendChild(brandIcon);
        siteBrand.appendChild(brandText);

        return siteBrand;
    }

    createActions() {
        const headerActions = document.createElement('div');
        headerActions.classList.add('header-actions');

        const newsCount = document.createElement('p');
        newsCount.classList.add('news-count');
        newsCount.textContent = '0 Noticias Publicadas';
        headerActions.appendChild(newsCount);

        const publishButton = document.createElement('button');
        publishButton.classList.add('publish-button');
        publishButton.id = 'publish-button';
        publishButton.type = 'button';
        publishButton.textContent = '+ Nova Noticia';
        publishButton.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent('open-news-form', {
                    bubbles: true,
                    composed: true,
                })
            );
        });

        headerActions.appendChild(publishButton);

        return headerActions;
    }

    styles() {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(`
        :host {
            display: block;
        }

        .site-header {
            background: color-mix(in srgb, var(--color-primary) 70%, transparent);
            color: var(--color-text);
            padding: 10px 0;
            position: sticky;
            top: 0;
            border-bottom: 1px solid var(--color-border);
            z-index: 10;

            /*Efeito de blur*/
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .site-header .content-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
        }

        .brand-icon {
            width: 40px;
            height: 40px;
            background-color: var(--color-accent);
            border-radius: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color-primary);
        }

        .brand-icon>svg {
            width: 20px;
            height: 20px;
        }

        .brand-text {
            text-align: left;
        }

        .brand-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--color-text);
        }

        .brand-subtitle {
            font-size: 0.75rem;
            font-weight: normal;
            opacity: 0.8;
        }

        .header-actions {
            display: flex;
            flex-direction: row;
            gap: 20px;
            justify-content: center;
            align-items: center;
        }

        .header-actions>.news-count {
            font-size: 0.875rem;
            opacity: 0.8;
            display: none;
        }

        .publish-button {
            background-color: var(--color-accent);
            color: var(--color-primary);
            padding: 8px 12px;
            border: none;
            border-radius: 10px;
            font-size: 0.875rem;
            cursor: default;
            outline: none;
        }

        .publish-button:hover {
            filter: brightness(0.9);
        }

        @media (min-width: 960px) {
            .header-actions>.news-count {
                display: block;
            }
        }
        `);

        return sheet;
    }
}

customElements.define('site-header', SiteHeader);