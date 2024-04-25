// Import the necessary modules here
import path from "path";
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  // Write your code here
  console.log(user.email);
  // console.log(file);
  console.log(process.env.STORFLEET_SMPT_MAIL_PASSWORD);
  const mailOptions = {
    from: process.env.STORFLEET_SMPT_MAIL,
    to: user.email,
    subject: "Welcome to storefleet",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Add your custom CSS styles here */
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
            }
            .logo {
                max-width: 150px;
            }
            .content {
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #20d49a;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            /* Mobile Responsive Styles */
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .logo {
                    max-width: 100px;
                }
                .button {
                    display: block;
                    margin-top: 10px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
                <h1>Welcome to Storefleet</h1>
            </div>
            <div class="content">
                <p style="text-align:center;color:purple">Hello, ${user.name}</p>
                <p style="text-align:center;color:purple">Thank you for registering with Storefleet. we are excited to have you as a new member of our community.</p>
                <p><a class="button" href=""style="width:300px;text-align:center">Get Started</a></p>
            </div>
        </div>
    </body>
    </html>`,
    attachments: [
      {
        filename: "logo.png",
        path: path.resolve("utils", "emails", "logo.png"),
        cid: "logo", 
      },
    ],
  };
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });
  const result = await transporter.sendMail(mailOptions);
  console.log("resultmail", result);
};
