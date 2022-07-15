/**
 * SLIDER
 */

/**
 * Navigation
 */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUrl = urlParams.get('p');
const contentDiv = $('#content');

var contentData = [
    './home.html',
    './shop.html',
    './cart.html',
    './checkout.html',
    './myaccount.html',
    './login.html'
];

$('#header').load('./header.html');
$('#footer').load('./footer.html');

var loggedStatus = false;
var loggedUser = {
    username: '',
    email: ''
};

// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

$(document).ready(function(){
    if (idUrl == null || idUrl == 'inicio') {
        //$('#content').load('./home.html');
        loadContent(0,'inicio');
    } else if (idUrl == 'tienda') {
        //$('#content').load('./shop.html');
        loadContent(1,'tienda');
    } else if (idUrl == 'carrito') {
        loadContent(2,'carrito');
        //$('#content').load('./cart.html');
    } else if (idUrl == 'pagar') {
        loadContent(3,'pagar');
        //$('#content').load('./cart.html');
    } else if (idUrl == 'micuenta') {
        loginValidate(4,'micuenta');
    } else if (idUrl == 'login') {
        loginValidate(5,'login')
    }
});

function loginValidate(url,name) {
    if (loggedStatus == false) {
        loadContent(5,'login');
    } else {
        loadContent(4,'micuenta');
    }
};

function logout () {
    loggedStatus = false;
    loadContent(5,'login');
}

function loginProcess() {
    var userfield = $('#usuario').val();
    var passwordfield = $('#password').val();
    console.log('usuario: '+userfield+' | contraseña: '+passwordfield);
    userExist = usuarios.find(u => u.username === userfield);
    console.log(userExist);
    if (userExist != undefined) {
        console.log('si existe');
        if (userExist.password != passwordfield) {
            alert('contraseña incorrecta');
        } else {
            loggedStatus = true;
            loggedUser.username = userExist.username;
            loggedUser.email = userExist.email;
            loadContent(4,'micuenta');
        }
    } else {
        alert('Usuario no existe');
    }
    
};
var filterStatus = 1;
function loadContent(id,page) {
    contentDiv.load(contentData[id], function() {    
        loadFinish(8,page,0,'');
        if (page == 'carrito') {
            cartPageTable();
            finalCost();
        } else if (page == 'pagar') {
            finalCost();
            formCheckout();
            radioEnvio();
        } else if (page == 'micuenta') {
            $('#current-username').text(loggedUser.username);
        };
    });
    let newQuery = '/lato-food/?p='+page;
    //let newQuery = '/?p='+page;
    window.history.pushState('', page, newQuery);
    
};
/**
 * Modal add to cart
 */
// add a button
// add another button

var cartModalItem = {
    id: '',
    nombre: '',
    precio: 0,
    qty: 1
}

modal.addFooterBtn('Cancelar', 'tingle-btn tingle-btn--danger', function() {
    // here goes some logic
    modal.close();
});
modal.addFooterBtn('Agregar a mi pedido', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    addToCart(cartModalItem.id,cartModalItem.nombre,cartModalItem.precio,cartModalItem.qty)
    modal.close();
});

var modalSearch;
const preciosAdd = [
    {
        id: 'g1',
        precio: 0
    },
    {
        id: 'g2',
        precio: 5
    },
    {
        id: 'g3',
        precio: 8
    },
    {
        id: 'c0',
        precio: 0
    },
    {
        id: 'c1',
        precio: 7
    },
    {
        id: 'c2',
        precio: 9
    },
    {
        id: 'c3',
        precio: 6
    }
]
function addModal(idp) {
    var modalSearch = dataProductos.find(s => s.id === idp);
    console.log(modalSearch);
    // set content
modal.setContent(`
<div class="tile is-ancestor content-modal">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child">
    <img class="modal-image" src="./img/products/${modalSearch.imagen}" alt="">
    </div>
    <div class="tile is-child box">
      <p class="title">Subtotal</p>
      <p class="subtitle is-4"><strong>S/.  </strong><span id="sub-modal"> ${modalSearch.precio}</span></p>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title titulo">${modalSearch.nombre}</p>
      <span class="title is-5">Agregar adicionales</span>
        <div class="form-inputs">    
                <div class="field">
                <label class="label">Gaseosa</label>
                <div class="control">
                    <div class="select is-fullwidth">
                    <select id="select-gaseosa">
                        <option value="g1">Ninguna</option>
                        <option value="g2">Personal</option>
                        <option value="g3">2 Litros</option>
                    </select>
                    </div>
                </div>
                </div>

                <div class="field">
                <label class="label">Complemento</label>
                <div class="control">
                    <div class="select is-fullwidth">
                    <select id="select-complemento">
                        <option value="c0">Ninguna</option>
                        <option value="c1">Papas fritas</option>
                        <option value="c2">Ensalada</option>
                        <option value="c3">Sopa</option>
                    </select>
                    </div>
                </div>
                </div>
        </div>
  </div>
</div>
    `);
    modal.open();
    
    cartModalItem.id = modalSearch.id;
    cartModalItem.nombre = modalSearch.nombre;

    let modalAddSubtotal = {
        initial: parseInt(modalSearch.precio),
        gaseosa: 0,
        complemento: 0
    };

    $("#select-gaseosa").change(function(){
        valGaseosa = $(this).val();
        priceGaseosa = preciosAdd.find(g => g.id === valGaseosa);
        modalAddSubtotal.gaseosa = priceGaseosa.precio;
        $('#sub-modal').text(modalAddSubtotal.initial+modalAddSubtotal.gaseosa+modalAddSubtotal.complemento);
        cartModalItem.precio = modalAddSubtotal.initial+modalAddSubtotal.gaseosa+modalAddSubtotal.complemento;
    });
    $("#select-complemento").change(function(){
        valComplemento = $(this).val();
        priceComplemento = preciosAdd.find(g => g.id === valComplemento);
        modalAddSubtotal.complemento = priceComplemento.precio;
        $('#sub-modal').text(modalAddSubtotal.initial+modalAddSubtotal.gaseosa+modalAddSubtotal.complemento);
        cartModalItem.precio = modalAddSubtotal.initial+modalAddSubtotal.gaseosa+modalAddSubtotal.complemento;
    });

};


/**
 * Load products in shop page
 */
var filterCriteria = '';
function loadFinish(q,p,f,c) {
$("#product-list").empty();
var totalQty = dataProductos.length;
/*if (p == 'inicio') {
    var totalQty = q;
 //   console.log('el valor de qty se cambio a'+q);
}*/
filterCriteria = c;

if (f == 0) {
    for(let p=0; p<totalQty; p++){
        //console.log(dataProductos[p].id);
        var precioOriginal = dataProductos[p].precio;
        var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#product-list").append(`<div class="card is-shady block">
            <div class="card-image card-shop">
                <figure class="image">
                    <img class="card-inner-image" src="./img/products/${dataProductos[p].imagen}" alt="Placeholder image" class="modal-button" data-target="modal-image2">
                </figure>
                </div>
                <div class="card-content">
                <div class="content">
                    <h4>${dataProductos[p].nombre}</h4>
                    <h3>S/. ${precioOriginal}</h3>
                    <span class="button is-danger" onclick="addModal('${dataProductos[p].id}');">Agregar al pedido</span>
                </div>
                </div>
            </div>`);

        }
} else if (f == 1) {

        for(let p=0; p<totalQty; p++){
            //console.log(dataProductos[p].id);
            var precioOriginal = dataProductos[p].precio;
            var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            if (dataProductos[p].categoria == filterCriteria) {
            $("#product-list").append(`<div class="card is-shady block">
                <div class="card-image card-shop">
                    <figure class="image">
                        <img class="card-inner-image" src="./img/products/${dataProductos[p].imagen}" alt="Placeholder image" class="modal-button" data-target="modal-image2">
                    </figure>
                    </div>
                    <div class="card-content">
                    <div class="content">
                        <h4>${dataProductos[p].nombre}</h4>
                        <h3>S/. ${precioOriginal}</h3>
                        <span class="button is-danger" onclick="addModal('${dataProductos[p].id}');">Agregar al pedido</span>
                    </div>
                    </div>
                </div>`);
                } else {
                    console.log('no coincide');
                }
            }
        }
};



$(document).ready(function(){
    console.log
    $(".filter-button").click(function(){
        
        console.log('filtro click');

    });
});

/**
 * Cart data
 */

var cartContent = [];

function addToCart(idProduct,name,price,q) {
    var productSearch = dataProductos.find(p => p.id === idProduct);
    //console.log(productSearch);
    var cartIndex = cartContent.findIndex((obj => obj.id == idProduct));
    //console.log(cartIndex);

    if (cartIndex >= 0) {
        cartContent[cartIndex].qty = cartContent[cartIndex].qty+1;
        cartContent[cartIndex].precio = cartContent[cartIndex].precio*cartContent[cartIndex].qty;

        //console.log(cartContent);
    } else {
        var cartItem = {
            id: idProduct,
            nombre: name,
            precio: price,
            qty: q
        };
        cartContent.push(cartItem);
        //console.log(cartContent);
    }
    $('#qty-number').html(cartContent.length);
    //openMini();
    $('#mini-cart-content').slideDown();
    setTimeout(function(){
        $('#mini-cart-content').slideUp();
    }, 2000);

    /**
     * Mini cart items load
     */
     $("#mini-cart-list").empty();
     for(let m=0; m<cartContent.length; m++){
        let itemM = cartContent[m];
        //console.log(dataProductos[p].id);
        //var precioOriginal = dataProductos[p].precio;
        //var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#mini-cart-list").append(`
            <tr>
            <td>${itemM.nombre}</td>
            <td>${itemM.precio}</td>
            <td>${itemM.qty}</td>
            </tr>
      `);
    }

    
};

function openMini() {
    $('#mini-cart-content').slideToggle();
};

var totalTable = {
    subtotal: 0,
    igv: 0,
    descuento: 0,
    envio: 0,
    total: 0

};
var discountMount = 0;
function cartPageTable() {
    $("#cart-page-list").empty();
    totalTable.subtotal = 0;
    subSuma = 0;
    for(let m=0; m<cartContent.length; m++){
        let itemM = cartContent[m];
        //console.log(dataProductos[p].id);
        //var precioOriginal = dataProductos[p].precio;
        //var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#cart-page-list").append(`
            <tr>
            <td>${itemM.nombre}</td>
            <td>${itemM.precio}</td>
            <td>${itemM.qty}</td>
            <td></td>
            </tr>
        `);
        subSuma = subSuma+parseInt(itemM.precio);
    }
    totalTable.igv = (subSuma*18)/100;
    totalTable.subtotal = subSuma;
    
    totalTable.total = (totalTable.subtotal+totalTable.igv)-discountMount;
    

};

function finalCost() {
    $('#sub-cell').text(totalTable.subtotal);
    $('#igv-cell').text(totalTable.igv);
    $('#total-cell').text(totalTable.total);
    $('#envio-cell').text(totalTable.envio);
    $('#discount-cell').text('- '+totalTable.descuento);
}

var discountObj = {};

function applyDiscount() {
    var search = $('#campo-descuento').val();
    console.log(search);
    discountObj = dataCupones.find(c => c.codigo === search);
    console.log(discountObj);
    subPrev = totalTable.subtotal+totalTable.igv;
    var discountMount = (subPrev*discountObj.descuento)/100;
    totalTable.total = (totalTable.subtotal+totalTable.igv)-discountMount;
    totalTable.descuento = discountMount;
    $('#discount-cell').text('- '+discountMount);
    $('#total-cell').text(totalTable.total);

}

//var costFind = {};
function formCheckout() {
    //shippingCost();
    $("#select-departamento").empty();
    for(let z=0; z<departamentos.length; z++){
        $("#select-departamento").append(`
            <option value="${departamentos[z].id}">${departamentos[z].nombre}</option>
        `);
    };
    
    var valDepartamento = $("#select-departamento").val();
    var proviciaFind = provincias.filter(p => p.departamento === valDepartamento);
    
    for(let p=0; p<proviciaFind.length; p++){
        $("#select-provincia").append(`
            <option value="${proviciaFind[p].id}">${proviciaFind[p].nombre}</option>
        `);
    };
    var valProvincia = $("#select-provincia").val();
    var distritoFind = distritos.filter(d => d.provincia === valProvincia);
    for(let d=0; d<distritoFind.length; d++){
        $("#select-distrito").append(`
            <option value="${distritoFind[d].id}">${distritoFind[d].nombre}</option>
        `);
    };
    console.log(distritoFind);

    $("#select-departamento").change(function(){
        $("#select-provincia").empty();
        $("#select-distrito").empty();
        valDepartamento = $("#select-departamento").val();
        proviciaFind = provincias.filter(p => p.departamento === valDepartamento);
        //console.log(proviciaFind)
        //console.log('cambio');
        for(let p=0; p<proviciaFind.length; p++){
            $("#select-provincia").append(`
                <option value="${proviciaFind[p].id}">${proviciaFind[p].nombre}</option>
            `);
        }
        valProvincia = $("#select-provincia").val();
        distritoFind = distritos.filter(d => d.provincia === valProvincia);
        for(let d=0; d<distritoFind.length; d++){
            $("#select-distrito").append(`
                <option value="${distritoFind[d].id}">${distritoFind[d].nombre}</option>
            `);
        }
        shippingCost();
    });

    $("#select-provincia").change(function(){
        $("#select-distrito").empty();
        valProvincia = $("#select-provincia").val();
        distritoFind = distritos.filter(d => d.provincia === valProvincia);
        //console.log(distritoFind)
        //console.log('cambio');
        for(let d=0; d<distritoFind.length; d++){
            $("#select-distrito").append(`
                <option value="${distritoFind[d].id}">${distritoFind[d].nombre}</option>
            `);
        }
        shippingCost();
    });
    $("#select-distrito").change(function(){
        shippingCost();
    });
};

function shippingCost() {
    valDistrito = $("#select-distrito").val();
    console.log(shippingPrecio);
    var costFind = distritos.find(d => d.id === valDistrito);
    var shippingPrecio = costFind.precio;
    totalTable.envio = shippingPrecio;
    finalCost();
}

function radioEnvio(){ 
    $('input[name=tipoenvio]').change(function(){
        //alert('cambiaron');
        if (this.value == 'store') {
            console.log('tienda');
            $('#zona-envio').removeClass('visible');
        } else if (this.value == 'shipp') {
            console.log('envio');
            $('#zona-envio').addClass('visible');
        }
    });

};

/*$(document).ready(function(){ 
    $('input:radio[name=tipoenvio]').change(function(){
        var loquesea = this.value();
        alert(loquesea);
        var radio = $("input[name=tipoenvio]:cheked");
        var radioSingle = this.attr("id");
        alert('cambiaron');
        if (this.value == 'store') {
            alert('tienda');
        } else if (this.value == 'shipp') {
            alert('envio');
        }
    });

});*/


