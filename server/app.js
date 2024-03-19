require("./db/connection ")
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var formrRouter = require("./routes/formroute");
const quizrouter = require("./routes/quizstatus");
const cors = require("cors");
const  studentRoutes  = require("./routes/student");
const teacherRoutes = require("./routes/teacher");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/student",studentRoutes)
app.use("/api/teacher",teacherRoutes)
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/form", formrRouter);
app.use("/quiz", quizrouter);
// app.use("/api/student", studentRoutes);

app.listen(3000, (err) => {
  if (err) return console.log(err.message);
  console.log(`server started... \nhttp://localhost:3000`);
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
// set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
