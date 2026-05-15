import { sharedStyles } from './shared-styles.js';

class SiteFooter extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.appendChild(this.createFooter());
        this.shadow.adoptedStyleSheets = [sharedStyles, this.styles()];
    }

    createFooter() {
        const footer = document.createElement('footer');
        footer.classList.add('site-footer');

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('content-wrapper');

        contentWrapper.appendChild(this.createBrand());
        contentWrapper.appendChild(this.createCopyright());

        footer.appendChild(contentWrapper);

        return footer;
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

        brandText.appendChild(brandTitle);

        siteBrand.appendChild(brandIcon);
        siteBrand.appendChild(brandText);

        return siteBrand;
    }

    createCopyright() {
        const copyright = document.createElement('small');

        copyright.classList.add('right');
        copyright.innerHTML =
            '&copy; 2026 Impus News. All rights reserved.';

        return copyright;
    }

    styles() {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(`
            :host {
                display: block;
            }

            .site-footer {
                background: color-mix(
                    in srgb,
                    var(--color-primary) 50%,
                    transparent
                );

                color: var(--color-text);

                width: 100%;
                padding: 20px 0;
            }

            .content-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 15px;
            }

            .brand-text {
                text-align: left;
            }

            .brand-icon {
                width: 30px;
                height: 30px;

                background-color: var(--color-accent);

                border-radius: 40%;

                display: flex;
                justify-content: center;
                align-items: center;

                color: var(--color-primary);
            }

            .brand-icon svg {
                width: 18px;
                height: 18px;
            }

            .brand-title {
                font-size: 1.25rem;
                font-weight: bold;
            }

            .right {
                font-size: 0.875rem;
                opacity: 0.5;
            }
        `);

        return sheet;
    }
}

customElements.define('site-footer', SiteFooter);