DB.js
=====

This is a wrapper over mysql and mysql-queues node.js packages.<br/>

<b>Usage:</b><br>
<b>
Initialize object
</b>
<pre>
<code>
var dbClass = require('DB');
var options = {};
options.host = 'localhost';
options.user = 'root';
options.password = 'root';
options.database = 'test';
var db = new dbClass.DB(options);
</code>
</pre>

<b>
Select statement
</b>
<pre>
<code>
db.sql = 'select * from test where id = ? and name=?';
db.bindParams([id,name]);
db.select(function(err, results, fields){
..
..
});
</code>
</pre>


<b>
Transaction statement
</b>
<pre>
<code>
db.sql = 'insert into test (name) values (?)';
db.startTransaction();
db.insertTransaction(['bharat'],function(err, info) 
{
	if(err)
	{
		console.log('error');
		console.log(err);
		db.rollback();
	}
	else	
	{
		id = info.insertId;
		db.commit();
	}			    
});
db.executeTransaction();
</code>
</pre>
