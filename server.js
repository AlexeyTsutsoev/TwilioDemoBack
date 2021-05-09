require("dotenv").config();
const PORT = 4000;

const express = require("express");
const Twilio = require("twilio");
const cors = require("cors");

const app = express();

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.use(cors());

app.get("/token", (req, res) => {
  console.log("start get req");
  const id = req.query.id;
  console.log("id from req--->", id);
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  console.log("token from req--->", token);

  token.identity = id;
  token.addGrant(
    new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    })
  );

  res.send({
    identity: token.identity,
    jwt: token.toJwt(),
  });
});

app.listen(PORT, () => {
  console.log(`
    --------------------
    -${PORT} is running-
    -------------------- 
    `);
});
