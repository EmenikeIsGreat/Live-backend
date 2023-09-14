"use strict";
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');


// async..await is not allowed in global scope, must use a wrapper
async function main() {

  let config = {
    service:"gmail",
    auth:{
        user:"emenikeemail@gmail.com",
        pass:"kydrudoc ektt osqv"
    }
  }
  

  let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : "emenikeani3@gmail.com",
        to : "emenikeemail@gmail.com",
        subject: "Place Order",
        text:"YO"
    }

    transporter.sendMail(message).then((res) => {
        console.log(message)
    }).catch(error => {
        console.log(error)
    })


  
  
  //
}


main()


