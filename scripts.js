//Cotação de moedas do dia.

const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")

})

//Capturando o evento de submit (enviar) do formulário.
form.onsubmit = () => {
    event.preventDefault()

    switch(currency.value){
        case"USD":
        convertCurrency(amount.value, USD, "US$")
        break

        case"EUR":
        convertCurrency(amount.value, EUR, "€")
        break

        case"GBP":
        convertCurrency(amount.value, GBP, "£")
        break
    }
}

//Função para converter a moeda.

function convertCurrency(amount, price, symbol) {
    try{
        //Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        
        // Calcula o total.
        let total = amount * price

        // Verifica se o resultado não é um numero.
        if(isNaN(total)){
            return alert("Pro favor, digite o valor corretamente para converter.")
        }
        //Formatar o valor total.
        total = formatCurrencyBRL(total).replace("R$", "")

        //Exibindo o resultado total.
        result.textContent = `${total} Reais`

        // Limpa os valores do formulário.
        amount.value = ""
        currency.value = ""

        // Remove a classe do foooter removendo ele da tela.
        footer.classList.remove("show-result")
        // Aplica a classe que exibe o foofter para mostrar o resultado.
        footer.classList.add("show-result")
    }
    catch(error){
        // Remove a classe do foooter removendo ele da tela.
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde")
    }

    //Função para formatar o número em Reais Brasileiros.
    function formatCurrencyBRL(value){
        /* Converte para número para utilizar o toLocaleString para formatar no
           padrão BRL (R$)*/
        return Number(value).toLocaleString("pt-BR", 
            {
                style: "currency",
                currency: "BRL",
            }
        )
    }
}
