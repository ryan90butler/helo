const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    name: 'helo',
    secret: process.env.SESSION_SECRET,
    cookie: {
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));

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

      const { username, password} = req.body;
      let profile_pic = `https://robohash.org/${username}`

      req.db.users_table.findOne({ username, password, profile_pic })
          .then(user => {
              if (!user) {
                  return res.status(401).send({ success: false, message: 'it did not work' });
              }
              req.session.user = user.id
              res.send({ user, success: true, message: 'Logged in successfully', username, profile_pic });
          })
          .catch(err=>{
            console.log("invalid credentials")
          });
    });

    app.post('/api/register', (req, res) => {
      const { username, password } = req.body;
        let profile_pic = `https://robohash.org/${username}`
      req.db.users_table.insert({ username, password, profile_pic })
          .then(user => {
            req.session.user = user.id
              res.send({ user, success: true, message: 'logged in successfully' });
          })
          .catch(err =>{
            console.log(err)
          }

          );
    });

    app.get(`/api/profilePic`, (req,res)=>{
        const id = req.session.user;

        req.db.users_table.find({ id:req.session.user })
            .then((r) =>{
                res.send(r)
            })
            .catch((err) =>{
                console.log(err)
            })
    })

    app.get(`/api/logout`, (req, res) =>{
        req.session.destroy();
        res.send({ success: true, message: 'Logged out successfully' });
    })

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