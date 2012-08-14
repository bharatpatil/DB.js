/***
 * DB wrapper for mysql 
 * @param options
 * @returns {DB}
 */


function DB(options)
{
	if(options == null)
		throw new Exception("Options are required");
	
	options = options || {};
	
	this.host = options.host || null;
	this.port = options.port || '3306';
	this.user = options.user || null;
	this.password = options.password || null;
	this.database = options.database || null;
	this.client = null;
	
	
	if(this.database === null)
	{
		this.client = require('mysql').createClient({
		    user 		: this.user, 
		    password 	: this.password,
		    host		: this.host, //only needed if your mysql server isn't on your localhost
		    port		: this.port //only needed if your mysql port isn't 3306			
		});		
	}
	else
	{
		this.client = require('mysql').createClient({
		    user 		: this.user, 
		    password 	: this.password,
		    host		: this.host, //only needed if your mysql server isn't on your localhost
		    port		: this.port, //only needed if your mysql port isn't 3306
			database	: this.database
		});
		
	}
	
	this.queues = require('mysql-queues');
	this.queues(this.client, true);//debug false
	
	this.transaction = null;
	this.sql = null;
}

DB.prototype.close = function()
{
	this.client.end();
};

DB.prototype.useDB = function(dbName,callback)
{
	if(callback == null)
		this.client.useDatabase(dbName);
	else
	{
		this.client.useDatabase(dbName,callback);
	}
};

DB.prototype.select = function(callback)
{
	
	this.client.query(
			  this.sql,
			  callback);
/*			  function selectCb(err, results, fields) {
			    if (err) {
			      throw err;
			    }
			    console.log('==================results');
			    if(results.length != 0)
			    {
				    console.log(results.length);
				    whiteboardsXML[whiteboardId]=results[0].xml;
				    socket.emit('connectAck',whiteboardsXML[whiteboardId]);
			    }
			    else
			    {
			    	
			    }
			    //client.end();
			  }*/
	
};
DB.prototype.setSql = function(sSql)
{	
	this.sql = sSql;
};

DB.prototype.getSql = function(sSql)
{
	return this.sql;
};

DB.prototype.bindParams = function(arrParams)
{
	try
	{
	this.sql = this.client.format(this.sql,arrParams);
	}
	catch(err)
	{
		console.log(err);
	}
};

DB.prototype.insert = function(callback)
{	
	try
	{
		this.client.query(this.sql,callback);
	}
	catch(err)
	{
		console.log(err);
	}
};

DB.prototype.insertTransaction = function(arrParams,callback)
{
	try
	{
		this.transaction.query(this.sql,arrParams,callback);
	}
	catch(err)
	{
		console.log(err);
	}	
};

DB.prototype.autoCommit = function(nValue)
{
	try
	{
		this.client.query('SET autocommit='+nValue);
	}
	catch(err)
	{
		console.log(err);
	}
	
};

DB.prototype.startTransaction = function()
{
	try
	{
		this.autoCommit(0);
		this.transaction = this.client.startTransaction();
	}
	catch(err)
	{
		console.log(err);
	}	
};

DB.prototype.rollback = function()
{
	try
	{
		this.transaction.rollback();
	}
	catch(err)
	{
		console.log(err);
	}	
};

DB.prototype.commit = function()
{
	try
	{
		this.transaction.commit();
	}
	catch(err)
	{
		console.log(err);
	}
};

DB.prototype.executeTransaction = function()
{
	try
	{
		this.transaction.execute();
	}
	catch(err)
	{
		console.log(err);
	}
};
exports.DB = DB;