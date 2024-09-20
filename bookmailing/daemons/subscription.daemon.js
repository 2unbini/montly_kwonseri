import { promises as fs } from 'fs';
import mail from 'nodemailer';
import schedule from 'node-schedule';

const replaceHTML = function(html, obj) {
    return html.replace(/\{\{(.*?)\}\}/g, function(key) {
        const newData = obj[key.replace(/[{}]+/g, "")];
        return newData || "";
    });
}

const mailer = async function(title, objects) {
	try {
		let email = await fs.readFile('./templates/mail.html', { encoding: 'utf-8' });
		let text = replaceHTML(email, objects);
		let transporter = mail.createTransport({
			host: process.env.contactHost,
            port: 465,
            maxMessages: Infinity,
            debug: true,
            secure: true,
            auth:{
                user: process.env.contactEmail,
                pass: process.env.contactPassword
            },
            tls: {
                rejectUnauthorized: false
            }
		});

		let subscribers = ["kwoneunbini@gmail.com"];
		subscribers.forEach((item) => {
			transporter.sendMail({
				from   : `${process.env.contactEmail} <${process.env.contactEmail}>`,
				to     : item.email,
				subject: title,
				replyTo: process.env.contactEmail,
				headers: { 'Mime-Version' : '1.0', 'X-Priority' : '3', 'Content-type' : 'text/html; charset=iso-8859-1' },
				html   : text
			}, (err, info) => {
				if(err !== null) {
					console.log(err);
				} else {
					console.log(`Email sent to ${item.email} at ${new Date().toISOString()}`);
				}
			})
		});
	} catch (error) {
		console.log(error);
	}
}

schedule.scheduleJob('00 00 10 * * 1', async function() {
	try {
		mailer(`🧞 Weekly Subscription Email 🧞`, {
            'content' : "Field of Content!"
        });
	} catch (error) {
		console.log(error);
	}
})