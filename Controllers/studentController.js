const Student = require('../models/Student');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const uniqueToken = require('../utils/tokenGenerator');
const sendMail = require('../utils/emailService');

const register = async (req, res) => {
    // VALIDATE USER BEFORE SAVE
    const { error, value } = await User.regValidations(req.body);
    if (error) {
        return sendError(res, error.details[0].message);
    }

    //Destructure filtered value...
    const { username, email } = value;

    //CHECK IF EMAIL EXIST IN THE DATABASE
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        const message = 'Email already exist, try another one';
        return sendError(res, [], message);
    }


    // CREATE TOKEN
    const token = uniqueToken();

    // CREATE EMAIL VERICATION MESSAGE
    const link = `<div>
      <p>Hey ${username}

      <p>Verification Token</p>

      <h3>${token}</h3>

      <p>All The Best</p>
    </div>
    `;
    const subject = 'Verification Token';

    const student_id = "M" + uniqueToken();

    //Save new student to database
    const student = new Student({ ...value, token, student_id });
    const newStudent = await student.save();
    if (!newStudent) {
        const message = 'Error! Try again';
        return sendError(res, [], message);
    }

    //SEND EMAIL
    await sendMail(email, subject, link, (err, data) => {
        if (err) {
            const message = 'Error! Try again';
            return sendError(res, err, message);
        } else {
            const message = `Verification token has been sent to ${email}`;
            return sendSuccess(res, data, message);
        }
    });
};



module.exports = {
    register,
};
