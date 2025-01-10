const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnConfirma');
const errorMsg = document.getElementById('erroAutentic');
const modalLogin = document.getElementById('modalLogin');

btnLogin.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = userInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    displayError('Preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }),
    });

    if (!response.ok) throw new Error('Falha na autenticação');

    const data = await response.json();
    localStorage.setItem('user', data.email);
    localStorage.setItem('userId', data.id);

    window.location.href = data.usuarioRole === 'ADMIN' ? './admin/home_admin.html' : './home.html';
  } catch (error) {
    displayError('Usuário ou senha inválidos.');
  }
});

function displayError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('d-none');
}

function verificaLogin() {
  if (!localStorage.getItem('user')) {
    modalLogin.style.display = 'block';
  }
}
