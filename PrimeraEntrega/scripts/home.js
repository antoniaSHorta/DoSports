let url = `https://newsapi.org/v2/everything?q=sports&apiKey=c13f4420fe044d969e69b2fdda28218b`;
let mostrar_noticias = document.getElementById('noticias');

fetch(url).then((resp) => resp.json()).then(dato =>{
    console.log(dato);
    let noticias = (dato.articles);
    noticias.slice(0, 10).forEach(function(numero) {
        if (numero.urlToImage && numero.title && numero.description && numero.url) {
            let div = document.createElement('div'); 
            div.innerHTML = `
                <img class="imagenNoticia" src="${numero.urlToImage}" alt="Imagen de noticia">
                <h1 class="tituloNoticia">${numero.title}</h1>
                <h2 class="descripcionNoticia">${numero.description}</h2>
                <h3 class="urlNoticia"><a href="${numero.url}" target="_blank">${numero.url}</a></h3>
                <hr>`;
            mostrar_noticias.appendChild(div);
        }
    })

});

/*let url = `https://newsapi.org/v2/everything?q=sports&apiKey=c13f4420fe044d969e69b2fdda28218b`;
let mostrar_noticias = document.getElementById('noticias');

fetch(url).then((resp) => resp.json()).then(dato =>{
    console.log(dato);
    let noticias = (dato.articles);
    noticias.forEach(function(numero) {
        if (numero.urlToImage && numero.title && numero.description && numero.url) {
            let div = document.createElement('div'); 
            div.innerHTML = `
                <img class="imagenNoticia" src="${numero.urlToImage}" alt="Imagen de noticia">
                <h1 class="tituloNoticia">${numero.title}</h1>
                <h2 class="descripcionNoticia">${numero.description}</h2>
                <h3 class="urlNoticia"><a href="${numero.url}" target="_blank">${numero.url}</a></h3>
                <hr>`;
            mostrar_noticias.appendChild(div);
        }
    })

});*/