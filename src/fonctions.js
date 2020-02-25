// connexion avec la db et requête 
function connectDB(){
    const mysql = require('mysql');

    const con = mysql.createConnection({
    host: "devbdd.iutmetz.univ-lorraine.fr",
    user: "muller668u_appli",
    password: "ludo3052000",
    database: 'muller668u_geoloc'
    });

    con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM Lieu", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    });
}