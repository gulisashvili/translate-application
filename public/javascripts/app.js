$(function() {
  var searchResults = $('.search-results')
  ,   translateBtn  = $('#translate-btn');

  translateBtn.on('click', function() {
    var translateWord = $('#translate-word').val();
    var data = {
      word: translateWord
    };
    $.post('/translate', data , function(result) {
      console.log("From server " + result.word + "-" + result.text);
    });
  });



});
