const nmUser = document.getElementById('nmUser');
const obterQuarto = {
  [197.89]: 'apart02.jpg',
  [298.93]: 'apart03.jpg',
  [399.87]: 'apart01.jpg'
}
nmUser.innerText = localStorage.getItem('user');

//reservas - resumo
let checkin = '';
let checkout = '';
let adultos = '';
let criancas = '';

let quartoValor = 0.00;
let quartoNome = '';
let total = '';
let dias = '' ;
let resumoApartamento = document.querySelector('#resumoApartamento');

//alimentando o local storage

window.addEventListener('change', function(e) {
  checkin = document.getElementById('checkin').value;
  checkout = document.getElementById('checkout').value;
  adultos = document.getElementById('adultos').value;
  criancas = document.getElementById('criancas').value;
  
  let diff = new Date(checkout) - new Date(checkin);
  dias = diff / (1000*60*60*24);
  

  localStorage.quartoValor = quartoValor;
  localStorage.checkin = checkin;
  localStorage.checkout = checkout;
  localStorage.adultos = adultos;
  localStorage.criancas = criancas;
  localStorage.dias = dias
  
  recebeValorNomeQuarto(e);
  localStorage.quartoValor = quartoValor

  localStorage.total = ((parseInt(localStorage.adultos) + parseInt(localStorage.criancas)) * parseInt(localStorage.quartoValor)).toFixed(2) * dias;
  localStorage.imagensQuarto = obterQuarto[quartoValor]
  insereDadosReserva();
});

function recebeValorNomeQuarto(e) {
  e.preventDefault()
 quartoValor = (document.querySelector('input[name="quarto"]:checked').value !== '') ? document.querySelector('input[name="quarto"]:checked').value : null
   // quartoNome = e.target.name;
   //quartoValor = e.target.value;
}


// alimentando o resumo da reserva
// let resumoCheckin = document.querySelector('#resumoCheckin');
// let resumoCheckout = document.querySelector('#resumoCheckout');
// let resumoPessoas = document.querySelector('#resumoPessoas');


function insereDadosReserva() {
    let adultos = parseInt(localStorage.adultos);
    let criancas = parseInt(localStorage.criancas);
    //resumoApartamento.innerText = `R$ ${quartoValor}`;
    resumoApartamento.innerText = `R$ ${localStorage.quartoValor}`;
    resumoCheckin.innerText = localStorage.checkin.split('-').reverse().join('/');
    resumoCheckout.innerText = localStorage.checkout.split('-').reverse().join('/');
    resumoPessoas.innerText = adultos + criancas;
}

//limpando o local storage
window.addEventListener('load', function () {
  localStorage.removeItem('checkin');
  localStorage.removeItem('checkout');
  localStorage.removeItem('adultos');
  localStorage.removeItem('criancas');
  localStorage.removeItem('quartoValor');
  localStorage.removeItem('total');
  localStorage.removeItem('dias');
});

// selecaoInput.forEach(function(item) {
//   item.addEventListener('change', function(e) {
//     console.log(e.target.value);
//     console.log(e.target.name);
//   })
// })

function modal() { 
  const modalElement = document.querySelector('.modalSection')
  if (modalElement.classList.contains('disable')) {
    const imgQuartos = '../imagens/acomodacoes/' + localStorage.getItem('imagensQuarto')
    document.getElementById('imagensQuarto').setAttribute('src', imgQuartos)
    document.getElementById('quartosModal').innerHTML = 'R$ ' + localStorage.getItem('quartoValor')
    document.getElementById('checkinModal').innerHTML = localStorage.getItem('checkin')
    document.getElementById('checkoutModal').innerHTML = localStorage.getItem('checkout')
    document.getElementById('adultoModal').innerHTML = localStorage.getItem('adultos')
    document.getElementById('criancaModal').innerHTML = localStorage.getItem('criancas')
    document.getElementById('diasModal').innerHTML = localStorage.getItem('dias')
    document.getElementById('totalModal').innerHTML = 'R$ ' + localStorage.getItem('total')
    modalElement.classList.remove('disable')
  }else {
    modalElement.classList.add('disable')
  }
}