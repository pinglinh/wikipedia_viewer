$(document).ready(function() {
  function display_search_results(data) {
    console.log(data);
    var results = data.query.search;
    $("#results-list").html("");
    for (var single_result of results) {
      $("#results-list").append(
        `<li>
          <h3>
            <a href='https://en.wikipedia.org/wiki/${single_result.title}' target='_blank'>
              ${single_result.title}
            </a>
          </h3>
          <div class='snippet'>
            ${single_result.snippet}
          </div>
        </li>`
      );
    }
  }

  function search(event) {
    var query = $("#search").val();
    console.log("searching", query);
    $.ajax({
      url: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURI(query)}&format=json&srprop=snippet`,
      dataType: "jsonp",
      success: display_search_results
    });
  }

  $("#search-button").click(search);
});
