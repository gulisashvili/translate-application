$(function() {
  var searchResults = $('.search-results')
  ,   translateBtn  = $('#translate-btn');

  translateBtn.on('click', function() {
    var translateWord = $('#translate-word').val();
    var data = {
      word: translateWord
    };
    $.post('/translate', data , function(result) {
      if(result.error) {
        searchResults.html("<div class='alert alert-danger'><strong>  სიტყვა ვერ მოიძებნა </strong> - </div>"); 
      } else {
          searchResults.html("<div class='alert alert-success'><strong>" +
            result.word + "</strong> - " + result.text + "</div>");  
      }
            
    });
  });



});
