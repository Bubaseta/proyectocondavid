document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Enviar credenciales para obtener el token
        const loginResponse = await fetch('http://localhost:8090/auth/logueo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!loginResponse.ok) throw new Error('Error al iniciar sesión');

        const { token } = await loginResponse.json();
        localStorage.setItem('tribu', token);

        // Usar el token para obtener el formulario de pago
        const paymentResponse = await fetch('http://localhost:8090/api/formulario-pago', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!paymentResponse.ok) throw new Error('Acceso denegado al formulario de pago');

        const paymentContent = await paymentResponse.text();

        window.location.href = ""
        document.getElementById('permiso').innerHTML = paymentContent;

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});