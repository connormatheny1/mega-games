class Deck {
    constructor(){
      this.total = 0;
      this.colors = ['red', 'green', 'yellow', 'blue'];
      this.types = ['regular', 'special'];
      this.cardActions = ['skip', 'reverse', 'draw2', 'draw4']
      this.deck = [];
      this.shuffledDeck = [];
    }
    
    create(){
        let k = 2;
        for(let p = 0; p < k; p++){
            for(let i = 0; i < this.colors.length; i++){
                for(let j = 1; j < 11; j++){
                    let card;
                    if(j == 8){
                        card = {
                            color: 'lightgray',
                            val: j,
                            type: 'special',
                            cardActions: 'change-color'
                        }
                    }
                    else{
                        card = {
                            color: this.colors[i],
                            val: j,
                            type: 'regular',
                            cardActions: null
                        }
                    }
                    this.deck.push(card);
                }         
            }
            for(let i = 0; i < this.colors.length; i++){
                for(let k = 0; k < this.cardActions.length; k++){
                    let specialCard = {
                    color: this.colors[i],
                    val: this.cardActions[k],
                    type: 'special',
                    cardActions: this.cardActions[k]
                    }
                    this.deck.push(specialCard);
                }
            }
        }
      this.total = this.deck.length;
    }
    shuffle(){
      let num = 52;
      while(this.deck.length > 0){
        let rand = Math.floor(Math.random() * (Math.floor(this.deck.length) - Math.ceil(0)) + Math.ceil(0));
        let randCard = this.deck[rand];
        this.shuffledDeck.push({
          color: this.deck[rand].color,
          val: this.deck[rand].val,
          type: this.deck[rand].type,
          cardActions: this.deck[rand].cardActions
        });
        this.deck.splice(rand, 1);              
      }
    }

    getShuffledDeck(){
      return this.shuffledDeck;
    }
}