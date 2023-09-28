const swot = require("swot-node")


async function check(){
    console.log((await swot.getSchoolNames("emenike@terpmail.umd.edu")))
}

check()