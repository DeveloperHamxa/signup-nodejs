const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");    
    
});

app.post("/", function(req, res){
    const email = req.body.email;
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;

    console.log(email,Fname,Lname);

    var data = {
        members: [
            {
                 email_address: email,
                 status: "subscribed",
                 merge_fields: {
                     FNAME: Fname,
                     LNAME: Lname,
                 }

            }
        ]
    };

    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    const url = "https://us5.api.mailchimp.com/3.0/lists/4a9ea444fa";
    const option ={
        method: "POST",
        auth: "hamxa07 :2c07c87a28705279db42e1b221e45a2b-us5"
    }
    const request = https.request(url, option, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse.data);
        })
    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000);


// 2c07c87a28705279db42e1b221e45a2b-us5

// 4a9ea444fa