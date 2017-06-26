module.exports = function(tablename, callback){
  var db = this;
  var csvStream = csv
      .format({headers: true})
      .transform(function(row, next){
          setImmediate(function(){
              next(null, {A: row.a, B: row.b});
          });
      }),
      writableStream = fs.createWriteStream(tablename+".csv");

  writableStream.on("finish", function(){
    callback({status : 'success'});
  });

  csvStream.pipe(writableStream);
  for(i in db.data[tablename].data) csvStream.write(db.data[tablename].data[i]);
  csvStream.end();

}
