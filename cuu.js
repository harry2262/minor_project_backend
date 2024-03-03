const sendEmail = require("./utils/sendEmail");

(async () => {
  const res = await sendEmail({
    email: "jashanbath9@gmail.com",
    subject: "foobar",
    message: "foobar",
  });
  console.log(res);
})();
