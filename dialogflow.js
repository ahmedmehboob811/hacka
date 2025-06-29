// const dialogflow = require("@google-cloud/dialogflow");
// const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");
// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 8080;

// app.post("/webhook", async (req, res) => {
//   var id = res.req.body.session.substr(43);
//   console.log(id);
//   const agent = new WebhookClient({ request: req, response: res });

//   function hi(agent) {
//     console.log(`intent  =>  hi`);
//     agent.add(
//       "Hi I am the AI assistant of dialogflow, You can also connect with human directly"
//     );
//   }

//   function booking(agent) {
//     const { number, person, email, phone } = agent.parameters;
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "highrated109@gmail.com",
//         pass: "",
//       },
//     });
//     agent.add(
//       `Hi ${person.name}, Your order has been registered for ${number} person. We sent you email at ${email} and sent a message on your number ${phone}`
//     );

//     (async () => {
//       const info = await transporter.sendMail({
//         from: "highrated109@gmail.com",
//         to: email,
//         subject: "Hello Email Sent✔",
//         text: `Hi ${person.name}, Your order has been registered for ${number} person. We sent you email at ${email} and sent a message on your number ${phone}`, // plain‑text body
//         // html: "<b>Hello world?</b>", // HTML body
//       });

//       console.log("Message sent:", info.messageId);
//     })();

//     console.log("Number of People", number);
//     console.log("User Name", person);
//     console.log("User Email", email);
//     console.log("User Phone Number:", phone);
//   }

//   let intentMap = new Map();
//   intentMap.set("Default Welcome Intent", hi);
//   intentMap.set("booking", booking);
//   agent.handleRequest(intentMap);
// });
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });