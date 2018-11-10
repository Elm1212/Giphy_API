
//$( document ).ready(function() {

var weatherArray = ["Cold", "Snow", "Sunny", "Rain"]



$("#newValue").on("click", function (){
  var newWeather = $("#add").val();
  weatherArray.push(newWeather);
  $("#add").val("");
  addBtn();

  })

var addBtn = function(){
  $("#buttonZone").empty();

  for (var i = 0; i < weatherArray.length; i++) {
    var newBtn = $("<button>");
    newBtn.text(weatherArray[i]);
    newBtn.on("click", function() {
      $("#gifs-appear-here").empty();
      var weather = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + weather + "&api_key=uUVoQfxOgU0msYHweMLrtKo2FYhgEDn2&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
        
        var newDiv = $("<div>");
        newDiv.addClass("gifDiv")
        var newImage = $("<img>");
        newImage.attr("src", response.data[i].images.original_still.url)
        newImage.attr("data-still", response.data[i].images.original_still.url)
        newImage.attr("data-moving", response.data[i].images.original.url)
        
        newImage.on("click", function(){
          if ($(this).attr("data-still") == $(this).attr("src")) {
              $(this).attr("src", $(this).attr("data-moving"))
          }
          else { 
              $(this).attr("src", $(this).attr("data-still"))
          }
        })
        
          $(newDiv).append(newImage);
          var rating = $("<p>").text("Rating : " + response.data[i].rating)
          $(newDiv).append(rating);
          $("#gifs-appear-here").append(newDiv);

        }

      })


    })


    $("#buttonZone").append(newBtn);
  }
}

addBtn();

//console.log(response.data[i])
