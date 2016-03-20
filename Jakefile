
desc('This is the default task.');
task('default', [], function (params) {
  console.log('This is the default task.');
});

namespace('chef2masterchef', function () {
var elasticSearchHelper = require(__dirname + '/app/helpers/elasticSearchHelper')();
  desc('This the foo:bar task');
  task('createIndex', [], function () {
  	elasticSearchHelper.createIndex();
  });

});
