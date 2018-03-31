const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('server connected');
        app.set('db', db);
    })
    .catch(err => {
        console.warn('Failed to connect:');
        console.error(err);
    });

    app.use(checkDb());

    app.post('/api/login', (req, res) => {

      const { username, password } = req.body;

      req.db.users_table.findOne({ username, password })
          .then(user => {
              if (!user) {
                  return res.status(401).send({ success: false, message: 'it did not work' });
              }
              // req.session.user = user.user_id
              res.send({ success: true, message: 'Logged in successfully', username });
          })
          .catch(err=>{
            console.log("invalid credentials")
          });
    });

    app.post('/api/register', (req, res) => {
      const { username, password } = req.body;

      req.db.users_table.insert({ username, password })
          .then(user => {
            // req.session.user = user.user_id
              res.send({ success: true, message: 'logged in successfully' });
          })
          .catch(err =>{
            console.log(err)
          }

          );
    });

    function checkDb() {
      return (req, res, next) => {
          const db = app.get('db');

          if (db) {
              req.db = db;
              next();
          }
          else {
              res.status(500).send({ message: 'this died' });
          }
      };
  }

const port = process.env.PORT
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );