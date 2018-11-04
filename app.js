const main = document.querySelector('main');

window.addEventListener('load', e => {
    // updateNews();

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('sw registered');
        } catch (error) {
            console.log('sw err');
        }
    }
});

async function updateNews() {
    const res = await fetch(`https://reqres.in/api/users?page=2`);
    const json = await res.json();
    console.log(json.data);

    main.innerHTML = json.data.map(createCards).join('\n');
}

function createCards(item) {
    return `
    <div class="card">
        <img class="card-img-top" src="${item.avatar}" alt="Card image cap">
        <div class="card-body">
          <h4 class="card-title"><a>${item.first_name} ${item.last_name}</a></h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Button</a>
        </div>
      </div>
    `;
}