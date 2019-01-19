$( document ).ready(function() {
    
    var topics = ['politics','funny','food','animals','soccer','football','celebrities','basketball','cities',
              'cars','trump','obama','leonardo di caprio','women','babies',];

var btn;

// Adds new Topic to Array through which the Buttons will be generated'
var inputUser = ""; 


// Creates buttons from array
function btnCreator(){
  
  // Empties Div from previous elements
   $("#btn-section").empty();
  
  // FOR loop, creates buttons by looping through the "topic" array
  for(var i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    btn.addClass("btn btn-info");
    btn.attr("data",topics[i]);
    btn.text(topics[i]);
    $("#btn-section").append(btn);
  };
}


// By clickingthis button, ten random gifs from that category are created. 
$("#btn-section").on("click", ".btn", function(){
      var giphy = $(this).attr("data");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
      
      $.ajax({url: queryURL, method: "GET"}).done(function(response) {
        console.log(response);
        
            var gifsGenerated = response.data;

            for (var i = 0; i < gifsGenerated.length; i++) {
              // Creates a Div that holds gifs
              var giphyBox = $("<div>");
        
        // Displays rating under each GI (PG, G, etc...)
        var p = $("<p>");
        p.text(gifsGenerated[i].rating);
        var p = $("<p>").text("Rating: " + gifsGenerated[i].rating);

        // It allows the Gif's to be animated on click 
        var imageDisplay = $("<img>")
        imageDisplay.attr("src", gifsGenerated[i].images.fixed_height_still.url);
        imageDisplay.attr("data-still", gifsGenerated[i].images.fixed_height_still.url);
        imageDisplay.attr("data-animate", gifsGenerated[i].images.fixed_height.url)
        imageDisplay.attr("data-state", "still")
        imageDisplay.addClass("gif");
        
        // Appends each single Gif to a div
        giphyBox.append(imageDisplay);
        giphyBox.append(p);       
        // New generated Gifs will appear at the top of Div.
        $("#images-section").prepend(giphyBox);        
      }
      })
  })


// Gifs animate based on user clicks.
$("#images-section").on("click", ".gif", function(event){
  event.preventDefault();
  
  // Gets the current state(Animated or Still) of a GIF
  var state = $(this).attr("data-state");
          if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  };

});
   
// Form takes in Input from the User, whiich is added in the "topic" array and then transformed into a button. 
$(".submit").on("click", function(event){
  event.preventDefault();

  console.log("submit");
  inputUser = $("#user-input").val();
  // Topic added to array list
  topics.push(inputUser);
  console.log(topics);
  // Function creates button, declared earlier
  btnCreator();
});



btnCreator();  

});