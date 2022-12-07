let books = [];
const requestAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

const sectionBooksElement = document.getElementById('livros');
const sectionValueElement = document.getElementById('valor_total_livros_disponiveis');

getBooksOnAPI();

async function getBooksOnAPI() {
    const anwser = await fetch(requestAPI);
    books = await anwser.json();
    let booksWithDiscount = applyDiscount(books);
    listBooksOnScreen(books);
}

function applyDiscount(books) {
    const discount = 0.3;

    booksWithDiscount = books.map(book =>{
        return {...book, preco: book.preco - (book.preco * discount)}
    })

    return booksWithDiscount;
}

function listBooksOnScreen(booksList) {
    sectionBooksElement.innerHTML = '';
    sectionValueElement.innerHTML = '';
    booksList.forEach(book => {
        // let isAvalible = verifyBookIsAvalible(book);
        let isAvalible = book.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel';
        sectionBooksElement.innerHTML += `        
            <div class="livro">
                <img class="${isAvalible}" src="${book.imagem}" alt="${book.alt}" />
                <h2 class="livro__titulo">
                    ${book.titulo}
                </h2>
                <p class="livro__descricao">${book.autor}</p>
                <p class="livro__preco" id="preco">R$${book.preco.toFixed(2)}</p>
                <div class="tags">
                    <span class="tag">${book.categoria}</span>
                </div>
            </div>
        `
    });
}

// function verifyBookIsAvalible(book) {
//     if(book.quantidade > 0)
//         return 'livro__imagens';
//     else
//         return 'livro__imagens indisponivel';
// }