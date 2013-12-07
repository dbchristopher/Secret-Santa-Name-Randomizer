(function(){ 'use strict';

  var input = $("#names");

  var doSanta = function() {
    var assignment = [];
    var nameList = generateNameArray(input);
    if(_.size(nameList) >= 2) {
      _.forEach(_.clone(nameList), function(name) {
        var key = _.random(1, nameList.length) - 1;
        var receiver = nameList[key];
        _.remove(nameList, function(n){ return n === receiver });
        assignment.push([name, receiver]);
      });
      render(assignment);
    }
  }

  var nameListener = function(event) {
    var separator = [44,188];
    if(_.contains(separator, event.which)) {
      doSanta();
    }
  }

  var generateNameArray = function(input) {
    var nameList = $(input).val().split(',');
    nameList = _.map(nameList, function(name){ return name.trim(); });
    nameList = _.compact(nameList);
    return(nameList);
  }

  // output HTML
  var render = function(list) {
    var parent = $("#results ul");
    var redo = false;
    $(parent).find('li').remove();
    _.forEach(list, function(pair) {
      if(pair[0] === pair[1]) {
        redo = true;
      }
      $(parent).append(["<li>", pair[0], " -> ", pair[1], "</li>"].join(''));
    });
    if(redo === true) {
      doSanta();
    }
  }

  $(input).keypress(nameListener).blur(doSanta);
  doSanta();

})();


