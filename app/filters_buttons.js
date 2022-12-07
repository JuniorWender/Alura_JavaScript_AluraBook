// const buttons = document.querySelectorAll('.btn'); ou fazer assim que ele já trás um array direto
// const buttonPrice = document.getElementById('btnOrdenarPorPreco');
const buttons = document.getElementsByClassName('btn');

Array.from(buttons).forEach(btnClick => {
    btnClick.addEventListener('click',element => {
        if(element.target.value === 'preco')
        
            sortBooksByPrice();
        else{
            filterBooks(element);
        }
    })
});

function filterBooks(targetBtn) {
    let filtredBooks = targetBtn.target.value == 'disponiveis' ? filterIsAvalible() : filterCategory(targetBtn);
    listBooksOnScreen(filtredBooks);
    if(targetBtn.target.value == 'disponiveis'){
        const totalValue = calcTotalValue(filtredBooks);
        totalValueOnScreen(totalValue);
    }
}

function filterCategory(targetBtn) {
    return books.filter(book => book.categoria == targetBtn.target.value);
}

function filterIsAvalible() {
    return books.filter(book => book.quantidade > 0);
}

function sortBooksByPrice() {
    let ordeneredBooks = books.sort((a,b) => a.preco - b.preco);
    listBooksOnScreen(ordeneredBooks);
}

function calcTotalValue(books) {
    return books.reduce((acc,book) => acc + book.preco, 0).toFixed(2);
}

function totalValueOnScreen(totalValue) {
    sectionValueElement.innerHTML = `  
        <div class="livros__disponiveis">
            <p>Todos os livros disponíveis por R$ <span id="valor">${totalValue}</span></p>
        </div>
    `
}