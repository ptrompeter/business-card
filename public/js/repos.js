
(function(module){
  var repos = {};
  repos.all = [];
  var repoList = [];

  repos.callGit = function() {
    $.get('/github/users/ptrompeter/repos', function(data, message, xhr){
      repos.all = data;
      console.log(repos.all);
      // callback;
      // console.log(callback);
    })
    .then(function(data){
      repos.index();
    });
  };

  repos.culled = function(attr) {
    console.log('hit repos.culled');
    return repos.all.filter(function(repo){
      return repo[attr];
    });
  };

  var ui = function (){
    var $about = $('#about');
    $about.find('ul').empty();
  };

  repos.render = function(repo){
  //  console.log('hit repos.render');
  //  repoList = document.createElement('li');
    var item = '<li><div>'+repo.full_name+'</div><div>'+repo.html_url+'</div><div>'+repo.description+'</div></li>';
    repoList.push(item);
    console.log('test',repoList);
  //  $(repoList).append(item);
  //  $('#repolist').append(repolist);
  //  console.log(repolist);
    return repoList;
  };

  repos.index = function() {
    console.log('hit repos.index');
    ui();

    //console.log(repos.all);
  //  console.log(repos.all[1].full_name);
    var stuff = repos.culled('full_name').map(repos.render);
  //  $(repos.all).each($('#repolist').append(repos.render(this))
    //repos.culled('full_name').map(repos.render)
  //  console.log('repolist',repos.render(repos.all[1]))
    console.log('stuff',stuff);
    for (var i = 0; i < stuff.length; i++) {
      console.log('inside loop');
      $('#repolist').append(stuff[i]);
    }
//  $('#repolist').append(repos.render(repos.all[1]))
  //  );
  };
  module.repos = repos;

})(window);
