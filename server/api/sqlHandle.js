/**
 * Operating data database interface
 * @annotation  操作数据数据库接口
 * @author guibin
 */
const express = require('express');
const { sqlconnect } = require('./sqlConnectApi');
const router = express.Router();

/**
 * 使用数据库
 */
function use_database(con){
    const sql = 'use intelligent_scheduling'
    con.query(sql);
}

/**
 // 处理 Response.json() 响应
 * The json() method of the Response interface 
 takes a Response stream and reads it to completion. 
 It returns a promise which resolves with 
 the result of parsing the body text as JSON.
 * @param {*} res Response 响应
 * @param {*} result 结果
 */
var jsonWrite = function(res, result) {
  if(typeof result === 'undefined') {
      res.json({
          code: '1',
          msg: '操作失败'
      });
  } else {
      res.json(result);
  }
};

/**
 * 查询获取数据库数据
 * @con 数据库对象
 * @res Response 响应
 * @req Request  请求
 */
select_date = function(con,res,req){
  const sql = 'select * from flow_person'
  // 选择使用的数据库对象
  use_database(con);
  con.query(sql, [],function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          if(result.length === 0 ){
            console.log("不存在");
          }
          else {
            console.log("存在");
            jsonWrite(res,result);
          }
        }
      })
}

/**
 * 
 */
/* 
  INSERT INTO 
  `intelligent_scheduling`.`flow_person`
  (`store_id`, `time`, `flowing_person`,
  `start_time`, `end_time`)
    VALUES 
    (NULL, NULL, NULL, NULL, NULL);
*/
insert_data = function(con,req,res){
  // 选择使用的数据库对象
  // use_database(con);
  // let sql = 
  // `  INSERT INTO 
  // intelligent_scheduling.flow_person
  // (store_id, time, flowing_person,
  // start_time, end_time)
  // VALUES 
  // (NULL, NULL, NULL, NULL, NULL);`
  // con.query();
}


module.exports = {
    use_database,
    select_date,
    insert_data,
}