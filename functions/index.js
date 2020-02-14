const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

const contact = functions.https.onRequest((req, res) => {
  sgMail.setApiKey(functions.config().sendgrid.token);
  sgMail.send({
    to: 'info@jaspero.co',
    from: 'info@jaspero.co',
    subject: 'Novi kontakt',
    replyTo: req.body.email,
    text: 'Molim vas učitajte ovu poruku sa modernim preglednikom',
    html: `
        <p>Ime: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <p>Poruka: ${req.body.message}</p>
    `,
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


exports.site = {
  contact
};
