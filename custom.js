$(document).ready(function() {
  //When ascending button is click
  $("#ascending").on("click", function() {
    $("#output").html(
      $("#output").children("li").sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare(
          $(b).text().toUpperCase());
      }) // End Sort
    ); // End HTML
  }); // End Button Sort Name Click

    $("#descending").on("click", function() {
    $("#output").html(
      $("#output").children("li").sort(function(a, b) {
        return $(b).text().toUpperCase().localeCompare(
          $(a).text().toUpperCase());
      }) // End Sort
    ); // End HTML
  }); // End Button Sort Name Click

  //When search is clicked run code
  $('#search').click(function() {
    //Get Search Input
    var searchTerm = $('#searchTerm').val();
    //API url with the user's searchTerm
    var url = "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: 'json',
      success: function(data) {
        var id = data.artists.items[0].id;
        var url2 = "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=US"
          //clear html content at the start of the success
        $('#output').html('');

        $.ajax({
          type: "GET",
          url: url2,
          async: false,
          dataType: 'json',
          success: function(data2) {
            for (var i = 0; i < data2.tracks.length; i++) {
              //prepend the data into our unlist <ul>
              $('#output').prepend("<li>" + data2.tracks[i].name + "</li>");

            }
          },
          error: function(data2) {
            alert("Error");
          }
        }); //ajax
      },
      error: function(data) {
        alert("Error");
      }
    }); //ajax
  }); //click function
});
