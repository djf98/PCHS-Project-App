document.addEventListener('DOMContentLoaded', function() {
    const cards = [
        '../../images/PNG-cards-1.3/7_of_diamonds.png',
        '../../images/PNG-cards-1.3/queen_of_spades.png',
        '../../images/PNG-cards-1.3/jack_of_spades.png',
        '../../images/PNG-cards-1.3/8_of_diamonds.png',
        '../../images/PNG-cards-1.3/6_of_clubs.png',
        '../../images/PNG-cards-1.3/9_of_hearts.png',
        '../../images/PNG-cards-1.3/ace_of_hearts.png',
        '../../images/PNG-cards-1.3/8_of_spades.png',
        '../../images/PNG-cards-1.3/queen_of_diamonds2.png',
        '../../images/PNG-cards-1.3/jack_of_hearts2.png',
        '../../images/PNG-cards-1.3/king_of_clubs.png',
        '../../images/PNG-cards-1.3/7_of_clubs.png',
        '../../images/PNG-cards-1.3/jack_of_spades2.png',
        '../../images/PNG-cards-1.3/jack_of_clubs2.png',
        '../../images/PNG-cards-1.3/queen_of_clubs2.png',
        '../../images/PNG-cards-1.3/10_of_diamonds.png',
        '../../images/PNG-cards-1.3/10_of_spades.png',
        '../../images/PNG-cards-1.3/black_joker.png',
        '../../images/PNG-cards-1.3/king_of_hearts2.png',
        '../../images/PNG-cards-1.3/ace_of_spades2.png',
        '../../images/PNG-cards-1.3/jack_of_clubs.png',
        '../../images/PNG-cards-1.3/6_of_spades.png',
        '../../images/PNG-cards-1.3/king_of_spades2.png',
        '../../images/PNG-cards-1.3/4_of_hearts.png',
        '../../images/PNG-cards-1.3/2_of_spades.png',
        '../../images/PNG-cards-1.3/queen_of_clubs.png',
        '../../images/PNG-cards-1.3/3_of_hearts.png',
        '../../images/PNG-cards-1.3/5_of_spades.png',
        '../../images/PNG-cards-1.3/6_of_diamonds.png',
        '../../images/PNG-cards-1.3/queen_of_diamonds.png',
        '../../images/PNG-cards-1.3/7_of_hearts.png',
        '../../images/PNG-cards-1.3/king_of_hearts.png',
        '../../images/PNG-cards-1.3/ace_of_clubs.png',
        '../../images/PNG-cards-1.3/9_of_diamonds.png',
        '../../images/PNG-cards-1.3/6_of_hearts.png',
        '../../images/PNG-cards-1.3/9_of_clubs.png',
        '../../images/PNG-cards-1.3/king_of_diamonds.png',
        '../../images/PNG-cards-1.3/4_of_spades.png',
        '../../images/PNG-cards-1.3/2_of_hearts.png',
        '../../images/PNG-cards-1.3/3_of_diamonds.png',
        '../../images/PNG-cards-1.3/10_of_hearts.png',
        '../../images/PNG-cards-1.3/king_of_clubs2.png',
        '../../images/PNG-cards-1.3/king_of_spades.png',
        '../../images/PNG-cards-1.3/jack_of_diamonds2.png',
        '../../images/PNG-cards-1.3/8_of_clubs.png',
        '../../images/PNG-cards-1.3/4_of_diamonds.png',
        '../../images/PNG-cards-1.3/jack_of_diamonds.png',
        '../../images/PNG-cards-1.3/3_of_spades.png',
        '../../images/PNG-cards-1.3/5_of_hearts.png',
        '../../images/PNG-cards-1.3/7_of_spades.png',
        '../../images/PNG-cards-1.3/ace_of_spades.png',
        '../../images/PNG-cards-1.3/5_of_diamonds.png',
        '../../images/PNG-cards-1.3/9_of_spades.png',
        '../../images/PNG-cards-1.3/queen_of_hearts.png',
        '../../images/PNG-cards-1.3/ace_of_diamonds.png',
        '../../images/PNG-cards-1.3/king_of_diamonds2.png',
        '../../images/PNG-cards-1.3/5_of_clubs.png',
        '../../images/PNG-cards-1.3/2_of_clubs.png',
        '../../images/PNG-cards-1.3/jack_of_hearts.png',
        '../../images/PNG-cards-1.3/10_of_clubs.png',
        '../../images/PNG-cards-1.3/queen_of_spades2.png',
        '../../images/PNG-cards-1.3/queen_of_hearts2.png',
        '../../images/PNG-cards-1.3/2_of_diamonds.png',
        '../../images/PNG-cards-1.3/8_of_hearts.png',
        '../../images/PNG-cards-1.3/red_joker.png',
        '../../images/PNG-cards-1.3/3_of_clubs.png',
        '../../images/PNG-cards-1.3/4_of_clubs.png'
    ]
    let temp_cards = cards;
    function rn(len){
        return Math.floor(Math.random()*len);
    }
    
    function start_test(){
        let first_card = null;

    }

    function get_4_cards(){
        //need to get four random cards
        let c1;
        let c2;
        let c3;
        let c4;
        // this will store the indices of cards we already used so we don't use
        // them again
        let cards_used = [];
        let count = 0;

        // get the random card for c1

        index = rn();

        c1 = cards[index];
        cards_used.push(index)


        // get the random card for c1
        index = rn();
        //check to make sure it is not the same card
        while(cards_used.indcludes(index)){
            index = rn();
        }
        
        c2 = cards[index];
        cards_used.push(index)

        // get the random card for c3
        index = rn();
        //check to make sure it is not the same card
        while(cards_used.indcludes(index)){
            index = rn();
        }
        
        c3 = cards[index];
        cards_used.push(index)


        // get the random card for c4
        index = rn();
        //check to make sure it is not the same card
        while(cards_used.indcludes(index)){
            index = rn();
        }
        
        c4 = cards[index];
        cards_used.push(index)
        


    }
    




    const shuffledCards = shuffle(temp_cards);

    // Display four cards, one at a time
    let index = 0;
    const cardElement = document.getElementById('card');
    const nextButton = document.getElementById('nextButton');
    let first_card;

    function showNextCard() {
        var button1 = document.createElement("button");
        var button2 = document.createElement("button");

        // Set the button's text content
        button1.textContent = "yes";
        button2.textContent = "no";

        // Add an event listener to handle button click
        button1.addEventListener("click", function() {
            alert("Button clicked!");
        });
        button2.addEventListener("click", function() {
            alert("Button clicked!");
        });





        if (index < cards.length) {
            var cardImageURL = shuffledCards[index++];
            if (index == 1){
                first_card = cardImageURL;
                
                cardElement.style.backgroundImage = `url(${cardImageURL})`;
                cardElement.style.display = 'block';
            }
            if (index == 4){
                //window.open('../html/newpage.html');
                //document.location.href = '../html/newpage.html'
                if(rn(2)==0){
                    const cardElement = document.getElementById('card');
                    cardElement.style.backgroundImage = `url(${first_card})`;
                    cardElement.style.display = 'block';    
                }
                else{
                    const cardElement = document.getElementById('card');
                    cardElement.style.backgroundImage = `url(${cardImageURL})`;
                    cardElement.style.display = 'block';
                
                }
                var container1 = document.getElementById("button-container");
                var container2 = document.getElementById("button-container2");
                container1.appendChild(button1);
                container2.appendChild(button2);
            }
            else{
                cardElement.style.backgroundImage = `url(${cardImageURL})`;
                cardElement.style.display = 'block';
            }
            
        } 
        else {
            alert(`All cards have been shown. Last card same as first: ${isLastCardSameAsFirst}`);
        }

    }
    function test_case(){
        const cardElement = document.getElementById('card');
        cardElement.style.backgroundImage = `url(${first_card})`;
        cardElement.style.display = 'block';
    }

    // Function to shuffle the deck
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Add click event to show the next card when the button is clicked
    nextButton.addEventListener('click', showNextCard);

    // Initial display of the first card
    //start_test();
});
