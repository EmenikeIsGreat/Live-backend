"use strict";
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');


// async..await is not allowed in global scope, must use a wrapper
async function main() {

  let config = {
    service:"gmail",
    auth:{
        user:"emenikeemail@gmail.com",
        pass:"eurg ftcp lfyr dwuc"
    }
  }
  

  let transporter = nodemailer.createTransport(config);

    let message = {
        from : "emenikeani3@gmail.com",
        to : "jm.siekiera@gmail.com",
        subject: "Place Order",
        text:"YOSKIIIIII"
    }

    transporter.sendMail(message).then((res) => {
        console.log(message)
    }).catch(error => {
        console.log(error)
    })


  
  
  //
}


main()


