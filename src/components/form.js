import { sharedStyles } from './shared-styles.js';

class NewsForm extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(this.createForm());
        this.shadow.adoptedStyleSheets = [sharedStyles, this.styles()];
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    connectedCallback() {
        document.addEventListener('keydown', this.handleKeydown);
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeydown);
    }

    createForm() {
        const formOverlay = document.createElement('div');
        formOverlay.classList.add('form-news');
        formOverlay.setAttribute('role', 'dialog');
        formOverlay.setAttribute('aria-modal', 'true');
        formOverlay.setAttribute('aria-labelledby', 'form-title');

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        const formHeader = document.createElement('div');
        formHeader.classList.add('form-header');

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('form-title-container');

        const title = document.createElement('h2');
        title.classList.add('form-title');
        title.id = 'form-title';
        title.textContent = 'Nova Notícia';

        const description = document.createElement('p');
        description.classList.add('form-description');
        description.textContent = 'Preencha os campos abaixo para publicar uma nova notícia.';

        titleContainer.appendChild(title);
        titleContainer.appendChild(description);

        const closeButton = document.createElement('button');
        closeButton.classList.add('form-close');
        closeButton.type = 'button';
        closeButton.setAttribute('aria-label', 'Fechar formulário');
        closeButton.innerHTML = `
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        `;
        closeButton.addEventListener('click', () => this.close());

        formHeader.appendChild(titleContainer);
        formHeader.appendChild(closeButton);

        const form = document.createElement('form');
        form.classList.add('form');
        form.id = 'news-form';
        form.setAttribute('aria-labelledby', 'form-title');
        form.addEventListener('submit', (event) => this.handleSubmit(event));

        form.appendChild(this.createFormGroup('title', 'Titulo', 'text', true));
        form.appendChild(this.createFormGroup('author', 'Autor(a)', 'text', true));
        form.appendChild(this.createFormGroup('content', 'Conteúdo', 'textarea', true));
        form.appendChild(this.createFormGroup('image', 'URL da Imagem', 'url', false));

        const actionGroup = document.createElement('div');
        actionGroup.classList.add('form_actions');

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancelar';
        cancelButton.addEventListener('click', () => this.clean());

        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Publicar Notícia';

        actionGroup.appendChild(cancelButton);
        actionGroup.appendChild(submitButton);
        form.appendChild(actionGroup);

        formContainer.appendChild(formHeader);
        formContainer.appendChild(form);
        formOverlay.appendChild(formContainer);

        formOverlay.addEventListener('click', (event) => {
            if (event.target === formOverlay) {
                this.close();
            }
        });

        this.formOverlay = formOverlay;
        this.form = form;

        return formOverlay;
    }

    createFormGroup(id, labelText, inputType, required) {
        const group = document.createElement('div');
        group.classList.add('form-group');

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labelText;

        if (inputType === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.id = id;
            textarea.name = id;
            textarea.placeholder = ' ';
            textarea.rows = 5;
            if (required) textarea.required = true;
            group.appendChild(label);
            group.appendChild(textarea);
        } else {
            const input = document.createElement('input');
            input.type = inputType;
            input.id = id;
            input.name = id;
            input.placeholder = ' ';
            if (required) input.required = true;
            group.appendChild(label);
            group.appendChild(input);
        }

        return group;
    }

    handleKeydown(event) {
        // Fecha o formulário ao pressionar Escape
        if (event.key === 'Escape' && this.formOverlay.classList.contains('active')) {
            this.close();
        }
    }

    open() {
        // Abre o formulário e foca no primeiro campo
        this.formOverlay.classList.add('active');
        const firstInput = this.form.querySelector('input, textarea');
        firstInput?.focus();
    }

    close() {
        // Fecha o formulário e limpa os campos
        this.formOverlay.classList.remove('active');
        this.form.reset();
    }

    clean() {
        // Limpa os campos do formulário sem fechar a janela
        this.form.reset();
        const firstInput = this.form.querySelector('input, textarea');
        firstInput?.focus();
    }

    handleSubmit(event) {
        // Previne o comportamento padrão de envio do formulário
        event.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            title: formData.get('title')?.toString().trim(),
            author: formData.get('author')?.toString().trim(),
            content: formData.get('content')?.toString().trim(),
            image: formData.get('image')?.toString().trim(),
        };

        this.dispatchEvent(
            new CustomEvent('news-form-submitted', {
                detail: data,
                bubbles: true,
                composed: true,
            })
        );

        this.close();
    }

    styles() {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(`
            :host {
                display: block;
            }

            .form-news {
                position: fixed;
                inset: 0;
                display: none;
                justify-content: center;
                align-items: center;
                background-color: color-mix(in srgb, var(--color-form) 60%, transparent);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                z-index: 100;
            }

            .form-news.active {
                display: flex;
            }

            .form-container {
                display: flex;
                flex-direction: column;
                background-color: var(--color-form);
                color: var(--color-text);
                border-radius: 10px;
                border: 1px solid var(--color-border);
                width: 100%;
                max-width: 700px;
                padding: 30px;
                margin: 0 20px;
            }

            .form-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .form-title-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .form-title {
                font-size: 1.875rem;
                font-weight: 400;
                opacity: 0.9;
                color: var(--color-accent);
            }

            .form-description {
                font-size: 1rem;
                opacity: 0.4;
            }

            .form-close {
                background: none;
                border: none;
                color: var(--color-text);
                opacity: 0.5;
                font-size: 1.25rem;
                padding: 8px;
                cursor: pointer;
            }

            .form-close:hover {
                color: var(--color-accent);
                opacity: 0.9;
            }

            .form-group {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 14px;
            }

            .form-group label {
                position: absolute;
                top: 50%;
                left: 12px;
                transform: translateY(-50%);
                font-size: 1rem;
                color: color-mix(in srgb, var(--color-text) 78%, transparent);
                background-color: var(--color-form);
                padding: 0 6px;
                pointer-events: none;
                transition: top 0.2s ease, transform 0.2s ease, font-size 0.2s ease, color 0.2s ease;
            }

            .form-group:has(textarea) label {
                top: 22px;
                transform: translateY(0);
            }

            .form-group:focus-within label,
            .form-group:has(input:not(:placeholder-shown)) label,
            .form-group:has(textarea:not(:placeholder-shown)) label {
                top: 0;
                transform: translateY(-50%);
                font-size: 0.75rem;
                color: var(--color-accent);
                border-left: 1px solid var(--color-accent);
                border-right: 1px solid var(--color-accent);
            }

            .form-group input,
            .form-group textarea {
                width: 100%;
                background-color: transparent;
                border: 1px solid var(--color-border);
                border-radius: 5px;
                padding: 18px 10px 10px;
                color: var(--color-text);
                font-size: 1rem;
                transition: border-color 0.2s ease;
            }

            .form-group textarea {
                min-height: 120px;
                resize: vertical;
            }

            .form-group:focus-within input,
            .form-group:focus-within textarea {
                border-color: var(--color-accent);
                outline: none;
            }

            .form_actions {
                display: flex;
                flex-direction: row;
                gap: 10px;
                margin-top: 20px;
                justify-content: space-between;
            }

            .submit-button,
            .cancel-button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 0.8rem;
                cursor: pointer;
                outline: none;
            }

            .cancel-button {
                background-color: var(--color-primary);
                color: var(--color-text);
            }

            .submit-button {
                background-color: var(--color-accent);
                color: var(--color-primary);
            }

            .cancel-button:hover,
            .submit-button:hover {
                filter: brightness(1.3);
            }

            @media (min-width: 960px) {
                .form-container {
                    padding: 40px;
                }
            }
        `);

        return sheet;
    }
}

customElements.define('news-form', NewsForm);
