export const sharedStyles = new CSSStyleSheet();

sharedStyles.replaceSync(`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: "Playfair Display", "Playfair Display Fallback", serif;
    }

    p,
    label,
    textarea,
    select,
    button {
        font-family: "Inter", "Inter Fallback", sans-serif;
    }

    .content-wrapper {
        width: min(
            var(--content-max-width),
            calc(100% - (var(--content-gutter) * 2))
        );

        margin-inline: auto;
    }

    .site-brand {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .brand-text {
        text-align: left;
    }

    .brand-title {
        font-family: "Playfair Display", "Playfair Display Fallback", serif;
    }

    .brand-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`);
