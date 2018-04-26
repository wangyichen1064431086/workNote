<https://www.npmjs.com/package/mysql2>

MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl much more

针对Node.js的MySQL客户端。支持预编译语句、非utf8编码、二进制日志协议、压缩、ssl等。

### First Query
```
//get the client
const mysql = require('mysql2');

//create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// simple query
connection.query(
  'SELECT * FROM table WHERE name = "Page" AND age > 45',
  function(err, results, fields) {
    console.log(results);//results contains rows returned by server
    console.log(fields); //fields contains extra meta data about results
  }
)
```

### Using Promise Wrapper
MySQL2 also support Promise API. Which works very well with ES7 async await.

```
async function main() {
  // get the client
  const mysql = require('mysql2/promise');

  // create the connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

  //query database
  const [rows, fields] = await connection.execute('SELECT * FROM table WHERE name = ? AND age > ?', ['Morty', 14])
}

```