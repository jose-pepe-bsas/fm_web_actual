let total_price_msg = ""
// todas las bolsas
const bolsas = {
    riñon: [{
            medida: "15X20",
            minimo: 1000,
            precio: 77.217
        },
        {
            medida: "15X25",
            minimo: 1000,
            precio: 81.667
        },
        {
            medida: "20X30",
            minimo: 500,
            precio: 91.473
        },
        {
            medida: "35X25",
            minimo: 500,
            precio: 123.198
        },
        {
            medida: "40X30",
            minimo: 500,
            precio: 165.047
        },
        {
            medida: "45X35",
            minimo: 500,
            precio: 213.029
        },
        {
            medida: "50X40",
            minimo: 500,
            precio: 267.142
        },
        {
            medida: "55X45",
            minimo: 500,
            precio: 331.380
        },
        {
            medida: "60X50",
            minimo: 500,
            precio: 397.756
        },
        {
            medida: "70X35",
            minimo: 500,
            precio: 334.308
        },
        {
            medida: "70X40",
            minimo: 500,
            precio: 377.226
        },
        {
            medida: "20X50",
            minimo: 500,
            precio: 188.289
        },
        {
            medida: "30X50",
            minimo: 500,
            precio: 264.580
        },
    ],
    camiseta: [{
            medida: "20X30",
            minimo: 1000,
            precio: 36.292
        },
        {
            medida: "25X30",
            minimo: 1000,
            precio: 46.720
        },
        {
            medida: "30X40",
            minimo: 1000,
            precio: 58.681
        },
        {
            medida: "35X45",
            minimo: 1000,
            precio: 72.174
        },
        {
            medida: "40X50",
            minimo: 1000,
            precio: 95.375
        },
        {
            medida: "40X60",
            minimo: 1000,
            precio: 113.268
        },
        {
            medida: "45X60",
            minimo: 1000,
            precio: 129.209
        },
        {
            medida: "50X60",
            minimo: 1000,
            precio: 164.771
        },
        {
            medida: "50X70",
            minimo: 1000,
            precio: 191.246
        },
        {
            medida: "60X70",
            minimo: 1000,
            precio: 248.470
        },
        {
            medida: "60X80",
            minimo: 1000,
            precio: 283.122
        },

    ],
    ecommerce: [{
            medida: "20X35",
            minimo: 500,
            precio: 178.43
        },
        {
            medida: "25X40",
            minimo: 500,
            precio: 222.48
        },
        {
            medida: "30X45",
            minimo: 500,
            precio: 268.83
        },
        {
            medida: "30X50",
            minimo: 500,
            precio: 279.61
        },
        {
            medida: "35X50",
            minimo: 500,
            precio: 353.35
        },
        {
            medida: "40X55",
            minimo: 500,
            precio: 408.14
        },
        {
            medida: "40X60",
            minimo: 500,
            precio: 432.30
        },
        {
            medida: "45X60",
            minimo: 500,
            precio: 470.19
        },

    ]

};

function calcularPrecioPedido(medida, cantidad, tipo) {
    // Buscar la bolsa por su medida
    const bolsa = bolsas[tipo].find((b) => b.medida === medida);

    if (!bolsa) {
        console.error("Esa medida no parece ser estandar, consultanos por whatsapp.");
        return -1;
    }

    // Verificar si cumple con el mínimo de compra
    if (cantidad < bolsa.minimo) {
        console.error(
            `La cantidad solicitada (${cantidad}) es menor al mínimo (${bolsa.minimo}) para el tipo de bolsa ${tipo}.`
        );
        return -2;
    }

    // Calcular el precio total
    const precioTotal = cantidad * bolsa.precio;
    total_price_msg  = 
        `Pedido: ${cantidad} bolsas tipo ${tipo} de medida ${medida} → Precio total: $${precioTotal.toFixed(2)}`;
    return precioTotal;
}

/* Ejemplo de uso
console.log("Alguien cotiza una 40x30 de riñon, 600 unidades")
calcularPrecioPedido("40X30", 600, "riñon"); // Ejemplo válido
console.log("Ahora alguien cotiza una medida no estandar:")
calcularPrecioPedido("15X20", 800, "camiseta"); // Ejemplo con cantidad menor al mínimo
console.log("Alguien cotiza una 40X60 de ecommerce, 1200 unidades")
calcularPrecioPedido("40X60", 1200, "ecommerce"); // Ejemplo válido
*/

// Cotizacion
// TODO: Recortar el array que lee el valor de la medida a solamente los primeros caracteres donde esta la medida.
$(document).ready(function() {
    $("#cantidad_cotizacion").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".evaluando").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

let carrito = [];
let tipo_bolsa = "";

function mostrarOpcion(producto) {
    // Remover si existe la lista o contenedor de lista para evitar adicion de items.
    //

    const ul = document.createElement("ul");
    ul.setAttribute("id", "option_list")
    document.getElementById("option_list_container").appendChild(ul);

    const node = document.createElement("li");
    node.setAttribute("class", "fw-bolder mb-2 mt-3 text-white evaluando")
    const textnode = document.createTextNode(producto.medida + " minimo de compra: " + producto.minimo + " costando: " + producto.precio.toString().replace(/[.,]/g, (match) => (match === ',' ? '.' : ',')) + " AR$ la unidad.");
    node.setAttribute("medida", producto.medida);
    node.appendChild(textnode);
    document.getElementById("option_list").appendChild(node);
}



document.querySelector('#a_background').addEventListener("change", function() {
            tipo_bolsa = this.value;
            span = document.getElementById("seleccion_cotizacion");
            if (this.value == "pendiente") {} else {
                span.textContent = this.value;
                possible_list = document.getElementById("option_list");
                if (possible_list) {
                    possible_list.remove();
                }
                bolsas[this.value].forEach(mostrarOpcion)
            }


            //TODO: Para que solo se marque uno y el resto se desmarque, tengo
            // que conseguir la lista de items por separado, y luego al marcar uno, moverlo a la posicion 0, para asi asegurarme que de 1 al fin no hay mas con class selected_one

document.querySelectorAll('.evaluando').forEach(li => li.addEventListener("click", function() {
    // Remover la clase 'selected_one' de todos los elementos
    document.querySelectorAll('.evaluando').forEach(liAgain => liAgain.classList.remove("selected_one"));
    
    // Agregar la clase 'selected_one' al elemento actual
    this.classList.add("selected_one");

    // Actualizar el carrito con el producto seleccionado
    let producto = {
        producto: this.innerText,
        medida: this.attributes["medida"].nodeValue,
    };
    carrito = [producto]; // Reinicia el carrito con el nuevo producto seleccionado
}));
})

            let cantidad_bolsas = 0;

            document.querySelector('#cantidad_bolsas').addEventListener("input", function() {
                let cantidad_bolsas = this.value;
                let informe_precio = document.getElementById("precio_bolsas");
                carrito.forEach(bolsas => {
                    console.log(bolsas)
                    let precio = calcularPrecioPedido(bolsas.medida, cantidad_bolsas, tipo_bolsa);
                    if (precio == -1) {
                        informe_precio.innerText = "Esa medida no parece ser estandar, consultanos por whatsapp.";
                    }
                    if (precio == -2) {
                        informe_precio.innerText = `La cantidad solicitada (${this.value}) es menor al mínimo para el tipo de bolsa solicitado.`
                    } else {
                        precio = precio.toFixed(2).toString().replace(/[.,]/g, (match) => (match === ',' ? '.' : ','));
                        informe_precio.innerText = precio + " AR$, mas la matriz de impresion, que se calcula con tu logo.";
                    }
                });


            });

            function seguir_pedido() {
                let precio_indicado = document.getElementById("precio_bolsas");
                let wpp_msg = 
`https://api.whatsapp.com/send?phone=+54%209%2011%203293-5668&text=Hola%20vengo%20de%20cotizar%20lo%20siguiente:%20${total_price_msg}`
                window.location.replace(wpp_msg);
              
          
            }
