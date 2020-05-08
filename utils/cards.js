const createDeck = (numUsers) => {
    const colors = ['red', 'green', 'orange', 'blue']
    const specialCards = ['draw2', 'draw4', 'reverse', 'skip']
    let tmpcards = []
    let cards = []

    for(let i = 0; i < colors.length; i++){
        for(let j = 1; j <= 10; j++){
            let currCard
            if(i != 8){
                currCard = { val: j, color: colors[i], special: false }
            }
            else{
                currCard = { val: j, color: 'black', special: true }
            }
            tmpcards.push(currCard)
        }
    }
    for(let i = 0; i < colors.length; i++){
        for(let k = 0; k < specialCards.length; k++){
            let currCard
            if(specialCards[k] === 'draw4'){
                currCard = { val: 'draw4', color: 'black', special: true }
            }
            else{
                currCard = { val: specialCards[k], color: colors[i], special: true }
            }
            tmpcards.push(currCard)
        }
    }

    while(tmpcards.length > 0){
        let newCard
        let rand = Math.floor(Math.random() * (Math.floor(tmpcards.length) - Math.ceil(0)) + Math.ceil(0));
        newCard = { val: tmpcards[rand].val, color: tmpcards[rand].color, special: tmpcards[rand].special }
        cards.push(newCard)
        tmpcards.splice(rand, 1)
    }
    return cards
}

const dealCards = (usersInRoom, deck) => {
    for(let i = 0; i < usersInRoom.length; i++){
        usersInRoom[i].cards = deck.splice(0,7)
    }
    return [usersInRoom, deck]
}

const drawCard = (player, deck) => {

}

const giveCards = (to, deck, num) => {

}

const replenishDeck = (deck) => {
    //if deck has one card in it
    //create new deck
    //append additional deck to end of current deck
}

const playCard = (player) => {
    
}





module.exports = {
    createDeck,
    dealCards
}