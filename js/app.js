// variables

const carrito=document.querySelector("#carrito");

const contenedorCarrito=document.querySelector("#lista-carrito tbody");

const vaciarCarrito= document.querySelector("#vaciar-carrito");

const listaCursos=document.querySelector("#lista-cursos");

let articulosCarrito=[]


cargarEvenListeners();
function cargarEvenListeners(){
    // agregas un curso al carrito
    listaCursos.addEventListener('click', AgregarCursos);
    //  eliminar cosas del carrito
    carrito.addEventListener("click",eliminarCurso);
    // vaciar carrito
    vaciarCarrito.addEventListener("click",()=>{
        articulosCarrito=[];
        limpiarHtml()
    })
}

// funciones

function AgregarCursos(evt){
    if(evt.target.classList.contains("agregar-carrito")){
        cursoSeleccionado= evt.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    };
}

// elimina curso
function eliminarCurso(evt){
    if(evt.target.classList.contains("borrar-curso")){
        const cursoId=evt.target.getAttribute('data-Id');
        // borrar articulos
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId);
        carritoHtml()
    } 
}

function leerDatos(curso){
    console.log(curso)
    // crear objeto
    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('p span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    // revisar si nexiste el producto
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if(existe){
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito=[...cursos]; 
    }else{
        articulosCarrito=[...articulosCarrito,infoCurso]
    }

    console.log(articulosCarrito)

    carritoHtml()
}


// muestra de carrito

function carritoHtml(){

    // limpiar el carrito

    limpiarHtml()

    // recorre el carrito
    articulosCarrito.forEach(curso=>{
        const row= document.createElement('tr');
        row.innerHTML=`
            <td>
               <img src= ${curso.imagen} write=100%
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;
    // agrega el html en el tbody
    contenedorCarrito.appendChild(row);
    })
}

// elimina los cursos

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}