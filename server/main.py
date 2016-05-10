#!/usr/bin/env python

import tornado.ioloop
import tornado.web
# Import smtplib for the actual sending function
import smtplib
# Import the email modules we'll need
from email.mime.text import MIMEText
import syslog
from validate_email import validate_email

class MainHandler(tornado.web.RequestHandler):
	def post(self):
		self.set_header("Content-Type", "application/json")

		try:
			data = tornado.escape.json_decode(self.request.body)
		except ValueError:
			self.clear()
			self.set_status(400)
			self.finish({"error": 'missing parameter from and message'})
			return

		if 'from' not in data.keys():
			self.clear()
			self.set_status(400)
			self.finish({"error": 'missing parameter from'})
			return
		elif 'message' not in data.keys():
			self.clear()
			self.set_status(400)
			self.finish({"error": 'missing parameter message'})
			return

		# Create a text/plain message
		msg = MIMEText(data["message"])

		me = "contact@ghislain-rodrigues.fr"

		msg['Subject'] = 'Contact from website from %s' % data["from"]
		msg['From'] = data["from"]
		msg['To'] = me

		if not validate_email(data['from']):
			self.clear()
			self.set_status(400)
			self.finish({"error": 'invalid email address'})
			syslog.syslog(syslog.LOG_NOTICE, "mail website,invalid email address,from %s" % data["from"])
			return


		result = {}
		s = smtplib.SMTP('localhost')
		try:
			s.sendmail(me, [me], msg.as_string())
			result['result'] = 'ok'
		except SMTPRecipientsRefused:
			result['result'] = 'ko'
			result['code'] = 1
			result['reason'] = 'All recipients were refused'
			syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPRecipientsRefused,from %s" % data["from"])
		except SMTPHeloError:
			result['result'] = 'ko'
			result['code'] = 2
			result['reason'] = 'server error'
			syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPHeloError,from %s" % data["from"])
		except SMTPSenderRefused:
			result['result'] = 'ko'
			result['code'] = 3
			result['reason'] = 'invalid from address'
			syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPSenderRefused,from %s" % data["from"])
		except SMTPDataError:
			result['result'] = 'ko'
			result['code'] = 4
			result['reason'] = 'unexpected error. good luck with that'
			syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPDataError,from %s" % data["from"])
		s.quit()

		self.write(result)

def make_app():
	return tornado.web.Application([
		(r"/contact", MainHandler),
	])

if __name__ == "__main__":
	app = make_app()
	app.listen(8888)
	tornado.ioloop.IOLoop.current().start()
