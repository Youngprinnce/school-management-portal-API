//I DONT KNOW WHY DIS WORKS IN ASYNC/AWAIT FUNCTION, BUT DOESNT WORK WITHOUT IT
const Session = require('./models/Session');
const getSessionId = async () => {
    const session = await Session.findOne({ year: "2019/2021" });
    console.log(session)
}
console.log(getSessionId())
