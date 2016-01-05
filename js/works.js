var rawData= [
  {
    name: 'RacTrac',
    date: '2015-12-28',
    image: 'img/ractrac.png',
    text: "RacTrac accepts a user's geolocation, then maps that location with nearby bike racks maintained by the City of Seattle.  The app calls a City of Seattle database, the user selects the distance to the farthest rack, and the app does the math and maps the appropriate bike racks.  RacTrac is deployed on a node server on heroku.com to preserve API key security.",
    link: 'http://ractrac.herokuapp.com'
  }
];

function dateSort(){
  console.log('hit dateSort');
  rawData.sort(function(a,b){
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);

    return dateA - dateB;
  });
}

var Work = function(input){
  this.name = input.name;
  this.date = input.date;
  this.image = input.image;
  this.text = input.text;
  this.link = input.link;
  // rawData.push(this);
};

Work.prototype.toHtml = function(obj){
  var $newItem = $('li.template').clone();
  $('.template .title').html('<a href="' + obj.link + '">'+ obj.name +'</a>');
  $('.template .date').html(obj.date);
  $('.template .pic').html('<img src="' + obj.image + '">');
  $('.template .desc').text(obj.text);
  $newItem.removeClass('template');
  $('#portfolio').append($newItem);

};
//
// function pageWrite(){
//   dateSort();
//   console.log(rawData);
//   for (var i = rawData.length - 1 ; i >= 0; i--){
//     var $article = $('<li class="item"></li>');
//     $article.append('<div><a href="' + rawData[i].link + '">'+ rawData[i].name +'</a></div>');
//     $article.append('<div>'+ rawData[i].date +'</div>');
//     $article.append('<div>'+ rawData[i].text +'</div>');
//     $article.append('<img src="' + rawData[i].image + '">');
//     console.log($article);
//     $('#portfolio').append($article);
//   }
// }
//
// pageWrite();

function writeItem(){
  dateSort();
  for (var i = rawData.length - 1 ; i >= 0; i--){
    var item = new Work(rawData[i]);
    item.toHtml(item);
  }
};

writeItem();
