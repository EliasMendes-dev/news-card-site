const publishButton = document.getElementById("publish-button");
const formOverlay = document.getElementById("form-news");

// Buttons inside the form
const formCloseButton = document.getElementById("form-close");
const submitButton = document.querySelector(".submit-button");
const cancelButton = document.querySelector(".cancel-button");

// Imputs
const firstField = document.getElementById("title");
const authorField = document.getElementById("author");
const contentField = document.getElementById("content");
const imageUrlField = document.getElementById("image");

// Função para abrir e fechar o formulário
if (publishButton && formOverlay && formCloseButton) {
    const openForm = () => {
        formOverlay.classList.add("active");
        firstField?.focus();
    };

    const closeForm = () => {
        formOverlay.classList.remove("active");
    };

// Função para limpar os campos do formulário ao clicar no botão "Cancelar"
    cancelButton.addEventListener("click", () => {
        firstField.value = "";
        authorField.value = "";
        contentField.value = "";
        imageUrlField.value = "";

    });

// Abrir o formulário ao clicar no botão "Publicar Notícia"
    publishButton.addEventListener("click", openForm);
    formCloseButton.addEventListener("click", closeForm);

// Fechar o formulário ao clicar fora dele
    formOverlay.addEventListener("click", (event) => {
        if (event.target === formOverlay) {
            closeForm();
        }
    });

// Fechar o formulário ao pressionar a tecla "Escape"
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && formOverlay.classList.contains("active")) {
            closeForm();
        }
    });
}

