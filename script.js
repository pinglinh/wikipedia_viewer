$(document).ready(function() {
  function display_search_results(data) {
    console.log(data);
    var results = data.query.search;
    $("#results-list").html("");
    for (var single_result of results) {
      $("#results-list").append(
        `<li class='col-sm-12 col-lg-12 single-result-box'>
        <div>
          <h3>
            <a class='result-links' href='https://en.wikipedia.org/wiki/${single_result.title}' target='_blank'>
              ${single_result.title}
            </a>
          </h3>
          <div class='snippet'>
            ${single_result.snippet}
          </div>
          </div>
        </li>`
      );
    }
  }

  function search(event) {
    event.preventDefault(); // mostly have to do this with forms because otherwise the form will submit - if you don't have any action on the form, it will default to submit and as theres no action they submit to itself and just reloads
    var query = $("#search").val();
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
        data: {
        action: "query",
        list: "search",
        srsearch: query,
        format: "json",
        srprop: "snippet"
      },
      dataType: "jsonp",
      success: display_search_results
    });
  }

  $("#search-button").click(search);
  $("#search-form-id").submit(search);
  $("#random-article-button").click(function() {
      window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank')
  });
});
