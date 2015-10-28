function twitterCallback(twitter) {
  // Es fehlt der Stream von @antswithfriends selbst. Das wären dann zwei Suchen bzw. Streams,
  // aber wir haben nur einen Link zu den Tweets.
  var statusHTML = [];
  var allowedUsers = ["antswithfriends","supersoon","tfoe","bahne","crasch","dbloete","frank_oe","lirontocker","moeffju","mnordmeyer","mthie","peterlih","ralphathamburg","herr_schaft","hamburgstartups","notfrombrooklyn","9600baud"];

  for (var i = 0; i < twitter.results.length && i < 4; i++){
    var username = twitter.results[i].from_user;
    if ($.inArray(username, allowedUsers) > -1) {
      var status = twitter.results[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
        return '<a href="'+url+'">'+url+'</a>';
      }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
        return  reply.charAt(0)+'<a href="https://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
      });

      statusHTML.push('<li><div style="font-weight:bold;"><a href="https://twitter.com/'+username+'">'+username+'</a></div><span>'+status+'</span> &nbsp;<a href="https://twitter.com/'+username+'/status/'+twitter.results[i].id_str+'">'+relative_time(twitter.results[i].created_at)+'</a></li>');
    }
  }

  if (statusHTML.length > 0) {
    document.getElementById('twitter_update_list').innerHTML = statusHTML.join('');
  }
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[2] + " " + values[1] + ", " + values[3] + " " + values[4];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'vor weniger als einer Minute';
  } else if(delta < 120) {
    return 'vor einer Minute';
  } else if(delta < (60*60)) {
    return ('vor ' + parseInt(delta / 60)).toString() + ' Minuten';
  } else if(delta < (120*60)) {
    return 'vor einer Stunde';
  } else if(delta < (24*60*60)) {
    return 'vor ' + (parseInt(delta / 3600)).toString() + ' Stunden';
  } else if(delta < (48*60*60)) {
    return 'vor einem Tag';
  } else {
    return ('vor ' + parseInt(delta / 86400)).toString() + ' Tagen';
  }
}

function swap(element, on) {
  if (on == 'over') {
    $(element).css({ 'color' : 'red' , 'font-size' : '20px' });
  }
  else {
    $(element).css({ 'color' : 'green' });
  }
}
