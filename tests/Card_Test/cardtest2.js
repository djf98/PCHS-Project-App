
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


const card = document.getElementById('card');
const readyButton = document.getElementById('readyButton');
const SameButton = document.getElementById('SameButton');
const DiffButton = document.getElementById('DiffButton');
const NextButton = document.getElementById('NextButton');
const message = document.getElementById('message');
const resultMessage = document.getElementById('resultMessage');


let card_num = 1;
let cards_drawn = [];
let card_image = '';
let first_card = '';
    

readyButton.addEventListener('click', startTest);
function startTest(){
    readyButton.style.display = 'none';
    resultMessage.textContent = '';
    
    show_cards();
}
    

function show_cards(){
    if (card_num < 4){
        card_image = draw_random_card();
        card.style.backgroundImage = `url(${card_image})`;
        card.style.display = 'block';
        if(card_num == 1){
            first_card = card_image;
        }
        NextButton.style.display = 'block';
        card_num++;
        NextButton.addEventListener('click', show_cards);

        //show_cards();
    }
    else if(card_num == 4){

        NextButton.style.display = 'none';

        card_image = draw_random_card();
        let num = random_number(2);
        console.log(num);
        if(num == 0){
            card_image = first_card;
            card.style.backgroundImage = `url(${card_image})`;
        }
        else{
            card.style.backgroundImage = `url(${card_image})`;
        }
        SameButton.style.display = 'block';
        DiffButton.style.display = 'block';

        SameButton.addEventListener("click", function() {
            if(card_image == first_card){
                alert("Correct!");    
            }
            else{
                alert("Incorrect");
            }
            SameButton.style.display = 'none';
            DiffButton.style.display = 'none';
            NextButton.style.display = 'block';

        });

        DiffButton.addEventListener("click", function() {
            if(card_image != first_card){
                alert("Correct!");    
            }
            else{
                alert("Incorrect");
            }
            SameButton.style.display = 'none';
            DiffButton.style.display = 'none';
            NextButton.style.display = 'block';

        });

        card_num = 1;
        
        


    }
}


function test_win(){
    if (first_card == card_image){
        alert("Correct!");
    }
    else{
        alert("Correct!");
    }
}

function draw_random_card(){
    
    let rand_index = random_number;
    if (cards[rand_index] == cards_drawn[rand_index]){
        while (cards[rand_index] == cards_drawn[rand_index]){
            rand_index = random_number(cards.length);
        }
    }

    return cards[rand_index];


}

function random_number(n){
    let random_number =  Math.floor(Math.random() * n); 

    return random_number;
}
/*
*/