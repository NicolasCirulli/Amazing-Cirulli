export function filtrar(eventos, value){
    let checked = [...document.querySelectorAll( 'input[type="checkbox"]:checked' )].map( check => check.value)
    return eventos.filter( evento => (checked.includes( evento.category) || checked.length === 0) && evento.name.toLowerCase().includes( value.toLowerCase() ) )
}

export function render(template, elemento){
    elemento.innerHTML = template
}

export function crearCheckBoxes(categorias){
    let template = ''
    for( let categoria of categorias){
        template += `
        <input type="checkbox" class="btn-check" value="${categoria}" id="check-${categoria.replace(' ','-')}" autocomplete="off">
        <label class="btn btn-secondary" for="check-${categoria.replace(' ','-')}">${categoria}</label>
        `
    }
    return template
}

export function crearCards(events){
    let template = ''
    for( let {image, name, price, _id:id} of events){
        template += `
            <div class="card border-secondary pt-3 col-10 col-md-5 col-xl-3">
                    <img class="card-img-top w-100 h-50" src="${image}" alt="Title">
                    <div class="card-body d-flex flex-column">
                    <h4 class="card-title">${name}</h4>
                    <p class="card-text">Price : ${price}</p>
                    <a href="./details.html?id=${id}" class="btn btn-secondary col-4 align-self-center">Details</a>
                    </div>
            </div>
        `
    }
    return template
}

export function renderTabla (data, tabla){
    let template = ''
    for(let categoria in data){
        template += `
        <tr>
            <td>${categoria}</td>
            <td>${data[categoria].revenues}</td>
            <td>${data[categoria].porcentaje / data[categoria].count}</td>
        </tr>
        `
    }
    tabla.innerHTML += template
}