function chargeTickers(){
    fetch("../data.json")
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            localStorage.getItem("data");
            localStorage.setItem("data",JSON.stringify(data));
        })
}


//* Ingreso Plataforma
chargeTickers();
let user = document.getElementById("user");
let userResult = localStorage.getItem("username");
let userMoney = localStorage.getItem("usermoney");
let valor = sessionStorage.getItem("valor");
let lastDisponible = actualizarDinero(0, 0, 1);
let datos = JSON.parse(localStorage.getItem("data"));

if (!userResult) {
    Swal.fire({
        title: 'Ingresar Usuario',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">`,
        confirmButtonText: 'Ingresar',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            if (!login) {
                Swal.showValidationMessage(`Por favor ingrese un usuario valido`);
            }
            return { login: login }
        }
    }).then((result) => {
        localStorage.setItem("username", result.value.login);
        localStorage.setItem("usermoney", parseFloat(0));
        user.innerHTML = `¡Hola <b>${result.value.login}</b>!`
    })
} else {
    user.innerHTML = `¡Hola <b>${userResult}</b>!`;
}

//* DEPOSITOS
let depositar = document.querySelector("#depositar");
depositar.addEventListener("click", function () {
    Swal.fire({
        title: `Dinero a ingresar`,
        input: "text",
        inputPlaceholder: "Ingrese monto",
        inputValue: "",
    }).then((response) => {
        if (response.value > 0) {
            let suma = response.value;
            lastDisponible = actualizarDinero(suma, lastDisponible, 2);
        }
    })
});

//* DOLAR MEP
let dolarMEP = document.querySelector("#dolarmep");
dolarMEP.addEventListener("click", function () {
    Swal.fire({
        title: `Dinero a invertir`,
        input: "text",
        inputPlaceholder: "Ingrese monto",
        inputValue: "",
    }).then((response) => {
        if(response.value > (bonos[0].compra / 100)){
            if(response.value <= parseFloat(localStorage.getItem("usermoney"))){
                let resta = response.value;
                lastDisponible = actualizarDinero(resta, lastDisponible, 3);
            }
        }
    })

})

function actualizarDinero(deposito, lastDispo, op) {
    let disponible = parseFloat(0);
    switch (op) {
        case 1:
            disponible = parseFloat(lastDispo);
            break;
        case 2:
            disponible = parseFloat(lastDispo) + parseFloat(deposito);
            lastDispo = parseFloat(disponible);
            break;
        case 3:
            disponible = parseFloat(lastDispo) - parseFloat(deposito);
            lastDispo = parseFloat(disponible);
        default:
            break;
    }
    localStorage.setItem("usermoney", lastDispo);
    document.getElementById("monto").innerHTML = `${localStorage.getItem("usermoney")}`
    return parseFloat(localStorage.getItem("usermoney"));
}

//* dolar MEP
let ventaMEP = (parseFloat(bonos[1].compra) * parseFloat(bonos[0].venta)) / 1000;
document.getElementById("ventaMEP").innerHTML = `${ventaMEP.toFixed(2)}`

let compraMEP = parseFloat(bonos[0].compra) / parseFloat(bonos[1].venta);
document.getElementById("compraMEP").innerHTML = `${compraMEP.toFixed(2)}`

//* Categorias Tablas
document.getElementById("category").onchange = function () {
    var e = document.getElementById("category");
    var value = e.options[e.selectedIndex].value;
    sessionStorage.setItem("valor", value);
    table(value);
}

function table(value) {
    const result = datos.filter(p => p.cat == value);

    let stringTabla = `<tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                    </tr>`;

    let crearTabla = function () {
        for (let ticker of result) {
            let fila = `<tr><th>${ticker.ticker}</th>`
            fila += `<th style="font-size: 12px">${ticker.name}</th>`
            fila += `<th>${ticker.value}</th>`
            fila += `<th>${ticker.var}</th>`
            fila += `</tr>`
            stringTabla += fila;
        }
        return stringTabla;
    }
    document.getElementById("tabla").innerHTML = crearTabla(result);
}
