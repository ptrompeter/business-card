(function closure(module){
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
    var compiledTemplate = Handlebars.compile($template);
    return compiledTemplate(this);

    // var $newItem = $('li.template').clone();
    // $('.template .title').html('<a href="' + obj.link + '">'+ obj.name +'</a>');
    // $('.template .date').html(obj.date);
    // $('.template .pic').html('<img src="' + obj.image + '">');
    // $('.template .desc').text(obj.text);
    // $newItem.removeClass('template');
    // $('#portfolio').append($newItem);

  };

  function writeItem(){
    dateSort();
    rawData.forEach(function(x){
      var item = new Work(x);
      $('#portfolio').append(item.toHtml());
    });
  }

  module.loadData = function(){
    var eTag;
    $.ajax(
      {
        url: 'data/projects.json',
        type: 'HEAD',
        success: function(data, message, xhr){
          eTag = xhr.getResponseHeader('ETag');
        }
      }).done(function(){
        if (localStorage.eTag !== eTag){
          localStorage.eTag = eTag;
          $.getJSON('data/projects.json', function(data){
            localStorage.setItem('projects', JSON.stringify(data));
            $.each(data, function(){
              rawData.push(this);
            });
          });
        } else {
          rawData = JSON.parse(localStorage.projects);
        }
        writeItem();
      });
  };

  $('document').ready(function(){
    loadData();
    // writeItem();
    $('nav').on('click', function(e){
      var $name = ($(e.target).data('name'));
      if($(e.target).hasClass('tab')){
        // $('.tab-content').hide();
        // $('.tab-content').fadeIn();
        // $('#'+ $name).fadeIn();
      }
    });
    // $('#repolist').on('load', function(e){

    var url = window.location.href;

    if (url.indexOf('about') > -1) {
    //  console.log('sjbadkajb',repos.callGit(repos.index()))
      repos.callGit();
    }

    // });
    // $('nav .tab:first').click();
  });

})(window);

//.error(function(e){console.log('error',e, e.responseText)})
