const users = require('./users');
const faculties = require('./faculties');
const departments = require('./departments');
const courses = require('./courses');
const staffs = require('./staffs');
const sessions = require("./sessions");

const { checkLoggedIn, checkRole } = require('../middlewares/auth');

const routes = (app) => {
  app.use('/api', users());
  app.use('/api/staff',staffs());
  app.use('/api/faculty',  checkLoggedIn, checkRole, faculties());
  app.use('/api/department', checkLoggedIn, checkRole,  departments());
  app.use('/api/course', checkLoggedIn, checkRole, courses());
  app.use('/api/session', checkLoggedIn, checkRole, sessions());

  app.use((req,res,next)=>{
  	const error = new Error("Not found");
  	error.status = 404;
  	next(error)
  });

  app.use((error,req,res,next)=>{
  	res.status(error.status || 500);
  	res.json({error:{
  			message:error.message
  		}
  	})
  })
};

module.exports = routes;
