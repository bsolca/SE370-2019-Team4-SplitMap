var pg = require('pg');

const conString = "postgres://uqmlxptc:MEGiG-tuGZBtb7vyfh3yznevXjpt4MjQ@salt.db.elephantsql.com:5432/uqmlxptc"
var elephantPool = new pg.Client(conString);
elephantPool.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  elephantPool.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //elephantPool.end();
  });
});

module.exports = {
  elephantPool
}