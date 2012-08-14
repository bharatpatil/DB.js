DB.js
=====

This is a wrapper over mysql and mysql-queues node.js package.<br>

Usage:
Initialize object
<code>
var dbClass = require('DB');
var options = {};
options.host = 'localhost';    
options.user = 'root';
options.password = 'root';
options.database = 'test';
var db = new dbClass.DB(options);
</code>
