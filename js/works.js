var rawData= [
  // {
  //   name: 'RacTrac',
  //   date: '2015-12-28',
  //   image: 'img/ractrac.png',
  //   text: 'RacTrac accepts a user\'s geolocation, then maps that location with nearby bike racks maintained by the City of Seattle.  The app calls a City of Seattle database, the user selects the distance to the farthest rack, and the app does the math and maps the appropriate bike racks.  RacTrac is deployed on a node server on heroku.com to preserve API key security.',
  //   link: 'http://ractrac.herokuapp.com',
  // }
];

function dateSort(){
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

Work.prototype.toHtml = function(){

  var $template = $('#template').html();
  // var $template = $('#template').attr('src').toHtml();
  // console.log($('#template').load('js/projecttemplate.html'));
  // console.log(typeof($('#template').attr('src')));
  // console.log('here\'s the template html:');
  console.log($template);
  var compiledTemplate = Handlebars.compile($template);
  return compiledTemplate(this);

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
    $('#portfolio').append(item.toHtml());
  }
};

$('document').ready(function(){
  loadData();
  // writeItem();
  $('nav').on('click', function(e){
    var $name = ($(e.target).data('name'));
    if($(e.target).hasClass('tab')){
      $('.tab-content').hide();
      $('#'+ $name).fadeIn();
    }
  });
  $('nav .tab:first').click();
});

function loadData(){
  var eTag;
  $.ajax(
    {
      url: 'data/projects.json',
      type: 'HEAD',
      success: function(data, message, xhr){
        console.log(xhr.getResponseHeader('ETag'));
        eTag = xhr.getResponseHeader('ETag');
        console.log(eTag);
        console.log(typeof eTag);
      }
    }).done(function(){
      console.log('done');
      if (localStorage.eTag !== eTag){
        console.log('inside if');
        localStorage.eTag = eTag;
        console.log(localStorage.eTag);
        console.log(typeof localStorage.eTag);
        $.getJSON('data/projects.json', function(data){
          console.log('test', data);
          localStorage.setItem('projects', JSON.stringify(data));
          $.each(data, function(){
            rawData.push(this);
          });
          console.log('rawData', rawData);
        });
      } else {
        console.log('inside else');
        rawData = JSON.parse(localStorage.projects);
        console.log('rawData', rawData);
      }
      writeItem();
    });
};
// loadData();

//.error(function(e){console.log('error',e, e.responseText)})
