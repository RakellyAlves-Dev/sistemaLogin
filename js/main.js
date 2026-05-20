// CAPTURA DE FORMULARIO
// 1. Seleciona o formulário
const formulario = document.querySelector('#form-login');

// 2. Adiciona o evento de escuta para quando o botão for clicado
formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const email = document.querySelector('#email').value.trim()
    const senha = document.querySelector('#senha').value
    const feedbackGeral = document.querySelector('#feedback-geral')

    //validação basicas dos campos
    if(!email || !senha) {
        feedbackGeral.innerText = 'Por favor, preenchar todos os campos'
        feedbackGeral.style.color = 'red'
        return
    }

    try{
      const response = await fetch('http://localhost:3000/api/login',{method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({email,senha})

      })

      const dados = await response.json()

      if(response.ok){
        feedbackGeral.innerText = "Login realizado com sucesso! Redirecionamento..."
        feedbackGeral.style.color = 'green'

        //armazenar o token () e redirecionar

        localStorage.setItem('token', dados.token)
        setTimeout(() => window.location.href = ' /dashboard.html', 2000)

      }else{
         feedbackGeral.innerText = dados.mensegem
         feedbackGeral.style.color = 'red'
      }
    } catch(erro){
     feedbackGeral.innerText = 'Error ao conecta-se com o servidor!'
      feedbackGeral.style.color = 'red'
    }

    

}); 
    


