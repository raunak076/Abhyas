var mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://123:123@cluster0.rvxouqr.mongodb.net/`
  )
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("not connected"); 
    console.log(e);
  });
