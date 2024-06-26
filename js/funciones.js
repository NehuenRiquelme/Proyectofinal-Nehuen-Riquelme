botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.plataforma === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.plataforma;
            const productosBoton = productos.filter(producto => producto.plataforma === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
};

let productosEnCarrito;


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito (e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #616161, #f0f0f0)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
      
      const idBoton = parseInt(e.currentTarget.id); 
      const productoAgregado = productos.find(producto => producto.id === idBoton);
  
      if (productosEnCarrito.some(producto => producto.id === idBoton)) {
          const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
          productosEnCarrito[index].cantidad++;
      } else {
          productoAgregado.cantidad = 1;
          productosEnCarrito.push(productoAgregado);
      }
  
      actualizarNumerito();
  
      localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  }

  
/* creo funcion para que mi numero del carrito se actualize */

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}