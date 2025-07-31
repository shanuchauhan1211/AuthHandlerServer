const express = require('express');
const cors = require('cors');
const app = express();
const cookie = require('cookie');
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true
}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/setCookie',(req,res)=>{
const tokens =req.body;
console.log(tokens);

const cookieOptions={
     httpOnly: false,
     secure: false,        // local testing → false (true in production with HTTPS)
     sameSite: 'Lax',  // 'None' for cross-site cookies in prod, 'Lax' in dev
     path: '/',
}

res.setHeader('Set-Cookie', [
    cookie.serialize('accessToken', tokens.accessToken, {
  ...cookieOptions,
    //  maxAge: 60 * mins, // 15 minutes
    }),
    cookie.serialize('refreshToken', tokens.refreshToken, {

  ...cookieOptions,
     // maxAge: 60 * 60 * 24 * days, // 1 day
    }),
    cookie.serialize('providerToken', tokens.providerToken, {
  //     path: '/',
  ...cookieOptions,
    }),
    cookie.serialize('deviceToken', tokens.deviceToken, {
  ...cookieOptions,
    }),
  ]);

res.status(200).json({message:"Cookies are set"});

})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
