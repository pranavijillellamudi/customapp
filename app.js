const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const app = express();
app.use(express.static('./'));
port=3000

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'yRO9dHsaZQTFysooaI5kAvta5JutVX6I',
  issuerBaseURL: 'https://olive-kiwi-8077.cic-demo-platform.auth0app.com',
  secret: 'LONG_RANDOM_STRING',
  routes:{
    login:false
  }
};

app.use(auth(config));

app.get('/', (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.redirect("./luck.html");
    }
   else {
    res.send(`
        <style>
            body { background-color: lightblue; text-align: center; }
            h2 { color: darkblue; }
            p { color: navy; }
            button { background-color: blue; color: white; }
        </style>
        <h2>Welcome to nostalgic world!</h2>
        <p>Send msgs to your future-self or view msgs from your past-self!</p>
        <a href="/login"><button>Login to continue!</button></a>
    `);
}
});

app.get('/login',(req,res)=>{
    res.oidc.login({returnTo:'./luck.html'});
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});