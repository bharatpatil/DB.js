DB.js
=====

This is a wrapper over mysql and mysql-queues node.js package.<br>

Usage:
Initialize object
<code>
var dbClass = require('DB');<br/>
var options = {};<br/>
options.host = 'localhost';<br/>    
options.user = 'root';<br/>
options.password = 'root';<br/>
options.database = 'test';<br/>
var db = new dbClass.DB(options);<br/>
</code>
