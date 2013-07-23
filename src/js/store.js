// Generated by CoffeeScript 1.6.3
(function() {
  define('store', ['jquery', 'localfile'], function($, localfile) {
    var innerHTML, load, normalizedPath, reStore, save;
    innerHTML = window.document.documentElement.innerHTML;
    $(function() {
      var $body, bodyChildren;
      $body = $('body');
      bodyChildren = $('body > *');
      $(bodyChildren).detach();
      window.todotxt = $body.html();
      $body.empty();
      return bodyChildren.appendTo($body);
    });
    normalizedPath = function(filepath) {
      var path;
      if (!filepath) {
        return filepath = localfile.convertUriToLocalPath(location.href);
      } else {
        filepath = filepath.match(/^[ \t]*(.*?)[ \t\\\/]*$/)[1];
        if (filepath.search(/^([a-z]:)?[\/\\]/i === -1)) {
          path = localfile.convertUriToLocalPath(location.href);
          path = path.match(/^(.*[\\\/]).*?$/)[1];
          filepath = path + filepath;
        }
        return filepath = filepath.replace(/\//g, '\\');
      }
    };
    reStore = new RegExp('([\\s\\S]*!!' + 'WARNING!! Do not edit this line. \\(' + 'https://github.com/Leftium/todo.html\\))' + '([\\s\\S]*)(!!END' + 'STORE!![\\s\\S]*$)', 'm');
    load = function() {
      return JSON.parse(innerHTML.replace(reStore, '$2'), '$2');
    };
    save = function(store) {
      var jsonStr, newContents, oldContents;
      jsonStr = JSON.stringify(store);
      if (oldContents = localfile.load(normalizedPath())) {
        newContents = oldContents.replace(reStore, '$1       ' + jsonStr + '$3');
        return localfile.save(normalizedPath(), newContents);
      }
    };
    return {
      normalizedPath: normalizedPath,
      load: load,
      save: save
    };
  });

}).call(this);
