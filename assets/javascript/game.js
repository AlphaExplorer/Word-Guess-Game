// Variable declaration 
var list_of_characters = 
[
  {name: "Cersei Lannister", image: "assets/images/Cersei_Lannister.jpg"}, 
  {name: "Daenerys Targaryen", image: "assets/images/Daenerys_Targaryen.png"}, 
  {name: "Khal Drogo", image:"assets/images/Khal_Drogo.jpg"}, 
  {name: "Robert Baratheon", image: "assets/images/Robert_Baratheon.jpg"},
  {name: "Jaime Lannister", image:"assets/images/Jaime_Lannister.jpg"},
  {name: "Jon Snow", image:"assets/images/Jon_Snow.jpg"},
  {name: "Joffrey Lannister", image: "assets/images/Joffrey_Lannister.png"},
  {name:"Sansa Stark", image: "assets/images/Sansa_Stark.jpg"},
  {name: "Stannis Baratheon", image:"assets/images/Stannis_Baratheon.jpg"},
  {name:"Tyrion Lannister", image:"assets/images/Tyrion_Lannister.png"}
];

var numberWins = 0; 
var maxNumberGuesses = 15;
var guessing_board_synbol = "_";
var winning_trigger = false;

// # 1- Select a random character from the array list_of_characters
function character_generator(list)
{
  return list[numberWins].name.toLowerCase().replace(/ /g, '');
}

var selected_character = character_generator(list_of_characters);
console.log(selected_character)

// # 2- Convert the selected name into an array of letters to cross reference with user key input later one
var selected_character_name_letters = selected_character.split('');
// console.log(selected_character_name_letters);

// # 3   - Generate the Guessing Board where the correct user key input will display.
// # 3.1 - Create <divs> for the guessing board and name their class after the letters of the selected character.   
function boardGenerator(array)
{
  for(var i=0; i<array.length; i++)
  {
    $("#name_board").append('<div class='+selected_character[i]+' id="dash"">'+guessing_board_synbol+'<div>');
  }
} 
boardGenerator(selected_character_name_letters);

// # 4- Event handler code
// # 4.1-  Create empty arrays
var list_unique_pressed_keys = [] 
var list_all_pressed_keys = []
var attempts_remaining = maxNumberGuesses - list_all_pressed_keys.length;
$("#score_board").html(numberWins);
$("#last_pressed_key").html("Your last pressed key was: ");
$("#letters_guessed").html("You have pressed so far the following letters: " + list_unique_pressed_keys);
$("#remaining_guesses").html("You have the following number of guesses remaining: " + attempts_remaining);

document.onkeyup = function keyStroke (event){
  
  // #4.2 Get the keyboard button that was pressed and store it in last_pressed_key
  var last_pressed_key = event.key; 
  // console.log(list_unique_pressed_keys);

  // #4.3 Store all the pressed keys in list_all_pressed_keys
  list_all_pressed_keys.push(last_pressed_key);
  console.log(list_all_pressed_keys);
  
  // #4.4 update the number of attempt left
  attempts_remaining = maxNumberGuesses - list_all_pressed_keys.length;

  // #4.5 If the pressed key has not been pressed before store it in list_unique_pressed_keys
  if(list_unique_pressed_keys.indexOf(last_pressed_key) === -1) 
  {
    list_unique_pressed_keys.push(last_pressed_key);
    console.log(list_unique_pressed_keys);
  }
    
  // #4.6 If the last pressed key matches the class of #name_board, replace the blank of the guessing board for the last pressed key 
  $("."+last_pressed_key).html(last_pressed_key);  
  
  // #4.7 Let the user know which key was pressed last
  $("#last_pressed_key").html("Your last pressed key was: " + last_pressed_key);

  // #4.8 Let the user know the total number of unique keys press so far
  $("#letters_guessed").html("You have pressed so far the following letters: " + list_unique_pressed_keys);
  
  // #4.9 Let the user know the number of guesses remaining
  $("#remaining_guesses").html("You have the following number of guesses remaining: " + attempts_remaining);

  // #4.10 If all the letters of the selected character have been pressed convert the winning trigger variable to TRUE 
  winning_trigger = selected_character_name_letters.every(function(val) 
  {
    return list_all_pressed_keys.indexOf(val) >= 0; 
  });
  console.log(winning_trigger);
  //winning reset
  if (winning_trigger === true)
  {
    alert("Congratulation on your kill.  Keep climbing the ladder");
    list_unique_pressed_keys = [] 
    list_all_pressed_keys = []
    $("#score_board").html(numberWins+=1);
    $('#character-image').html('<img src='+list_of_characters[numberWins-1].image+' width="200rem">');
    attempts_remaining = maxNumberGuesses;
    $("#remaining_guesses").html("You have the following number of guesses remaining: " + attempts_remaining);
    $("div").remove("#dash");
    $("#letters_guessed").html("You have pressed so far the following letters: " + list_unique_pressed_keys);
    selected_character = character_generator(list_of_characters);
    selected_character_name_letters = selected_character.split('');
    boardGenerator(selected_character_name_letters);
  }

  //Losing reset
  if (attempts_remaining < 0)
  {
    alert("You lost");
    list_unique_pressed_keys = [] 
    list_all_pressed_keys = []
    $("#score_board").html("0");
    $('#character-image').html('<img src="assets/images/Iron_Throne.jpg" width="200rem">');
    attempts_remaining = maxNumberGuesses;
    $("#remaining_guesses").html("You have the following number of guesses remaining: " + attempts_remaining);
    $("div").remove("#dash");
    $("#letters_guessed").html("You have pressed so far the following letters: " + list_unique_pressed_keys);
    selected_character = character_generator(list_of_characters);
    selected_character_name_letters = selected_character.split('');
    boardGenerator(selected_character_name_letters);
  }

};//end of event handler code


