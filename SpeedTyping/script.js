const RANDOM_QUOTE = "https://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timer = document.getElementById('timer')

quoteInputElement.addEventListener('input',()=>{
    
    const spanEl = Array.from(quoteDisplayElement.querySelectorAll('span'))
    let count = 0
    quoteInputElement.value.split('').forEach((e,index)=>{
        let char = spanEl[index]
        
        if(char.innerText === e){
           char.classList.add('correct')
           char.classList.remove('incorrect')
           count++
        }else{
            char.classList.remove('correct')
           char.classList.add('incorrect')
        }
        
    })
    if(count === spanEl.length){
      renderQuote()
    }
    
})


async function getRandomQuote(){
   const response = await fetch(RANDOM_QUOTE)
    const data = await response.json()
    return data.content
}
async function renderQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = null
        quote.split('').forEach((e) =>{
            let charSpan = document.createElement('span')
            charSpan.innerText = e
            quoteDisplayElement.appendChild(charSpan)
            quoteInputElement.value = null
        })
     startTimer()      
} 
renderQuote() 

let startDate 
function startTimer(){
 timer.innerText = 0  
 startDate = new Date 
setInterval(()=>{
timer.innerText = getTimerTime()
},1000)
}
function getTimerTime(){
    return Math.floor((new Date()-startDate)/1000)
}