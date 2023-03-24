/**
 * Operating data database interface
 * @annotation  操作数据数据库接口
 * @author guibin
 */

/**
 * @annotation 连接mysql数据库
 * @return conn 一个数据库连接对象
 */
sqlconnect = function(){
    // 调用数据库连接 api
    const conn = mysqlConnect('localhost','root','123456');
    return conn;
}

/**
 * @host ip地址
 * @user 用户名
 * @pass 用户密码
 * @author guibin
 * @annotation Connecting to Mysql
 */
mysqlConnect = function(host,user,pass){
    const mysql = require('mysql')

    const con = mysql.createConnection({
        host: host,
        user: user,
        password: pass
    });

    con.connect(function(err){
        if(err) throw err;
        console.log('Connected!!!');
    });
    return con;
}




module.exports = {
    sqlconnect,
    mysqlConnect,
}