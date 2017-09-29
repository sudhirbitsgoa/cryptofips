//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
const crypto = require('crypto');

Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

var db = null,
    dbDetails = new Object();

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  console.log('some crypto test');
  let cipher = crypto.createCipher('aes192', '77cb54b4-6f08-429d-a558-add6cc8599e8');
  let decipher = crypto.createDecipher('aes192', '77cb54b4-6f08-429d-a558-add6cc8599e8');

  let encrypted = cipher.update('this is plain string to encrypt', 'utf8', 'hex');
  encrypted += cipher.final('hex');
  let plain = decipher.update(encrypted, 'hex', 'utf8')
  plain += decipher.final('utf8');
  console.log(encrypted)
  console.log('the plain', plain);
  res.json('some text');
  // require('./aes.js');
});

app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
