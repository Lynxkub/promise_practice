let numsUrl = 'http://numbersapi.com/random'





let numFacts = []

for (let i = 1; i < 5; i++){
    numFacts.push(axios.get(numsUrl))
}

Promise.all(numFacts)
.then(numsArr => (
    numsArr.forEach(n => console.log(n.data))
))
.catch(err => console.log(err))


// let baseUrl = 'http://deckofcardsapi.com/api/deck'

// response = axios.get(cardUrl)

// console.log(response)

// response
// // .then(data => console.log(data.data.deck_id , data.data.cards))
// .then(data => console.log(data.data.deck_id , `${data.data.cards[0].value} of ${data.data.cards[0].suit}`))
// .catch(err => console.log(err))



let baseUrl = 'http://deckofcardsapi.com/api/deck';


function getDeckID(){
    let baseUrl = 'http://deckofcardsapi.com/api/deck/new/draw'
    $.getJSON(`${baseUrl}`).then(data => {
        let deckID = data.deck_id;
        return(deckID)
    })
}


let deck_id = null;
let button = $('#drawCard')
let cardArea = $('#cardArea')

$.getJSON(`${baseUrl}/new/shuffle`).then(data => {
    deck_id = data.deck_id;
})



button.on('click', function(){
    $.getJSON(`${baseUrl}/${deck_id}/draw/`).then(data => {
        let cardImg = data.cards[0].image;
        cardArea.append(
            $('<img>', {
                src: cardImg
            })
        )
        if (data.remaining === 0){
            button.remove();
        } 
    })
   
})