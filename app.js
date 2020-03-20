const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');     //body parser allows us to use form input values by adding it to the body property
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const ejs = require('ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.set('views', __dirname + '/views');


MongoClient.connect('mongodb+srv://root:root@cluster0-rmdku.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
if (err) return console.log(err);   
db = client.db('notes') 
 app.listen(4000, () => {
        console.log('listening on 4000');
    })

    app.post('/exercise', (request, response) => {
        db.collection('exercise').save(request.body, (err, result) => {
            if(err) {
                return console.log('error');
            }
            console.log('saved the item to database :)');
            response.redirect('/exercise');
        })
      });

        app.put('/exercise', (req, res) => {

            var item = {
                name: req.body.name,
                duration: req.body.duration
            }

            var id = req.body.id

            db.collection('exercise').update({id: objectID(id)}, {$set: item}, (err, result) => {
              if (err) return res.send(err);
              console.log('item updated :)');
            })

        });

        
       
       app.get('/delete/:id', (req, res) => {
        const _id = req.query["id"];
           db.collection('exercise').deleteOne({_id: _id}, (err, obj) => {
             if (err) throw err;
             console.log("Destroyed: " + obj + " successfully!");
             res.redirect( '/' );
           });
       })

   
      app.get('/', (req, res) => {
          var cursor = db.collection('exercise').find().toArray((err, results) => {
            res.render('index.ejs', {exercises: results});
          });
         
      });

      app.get('/exercise', (req, res) => {
        var cursor = db.collection('exercise').find().toArray((err, results) => {
            res.render('exercise', {exercises: results});
          });
      })

      app.get('/dashboard', (req, res) => {
       res.render('dashboard');
      });

    
})






