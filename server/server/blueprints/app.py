from flask import Blueprint, request
import json
# Import smtplib for the actual sending function
import smtplib
# Import the email modules we'll need
from email.mime.text import MIMEText
import syslog
from validate_email import validate_email


bp = Blueprint('api', __name__)


@bp.route('/', methods=['POST'])
def contact():
    data = request.get_json()

    if "from" not in data.keys():
        return json.dumps({"error": "missing parameter from"}), 400
    elif "message" not in data.keys():
        return json.dumps({"error": "missing parameter message"}), 400
    elif len(data["message"].strip()) == 0:
        return json.dumps({"error": "empty message provided"}), 400

    # Create a text/plain message
    msg = MIMEText(data["message"])

    me = "ghislain.rodrigues@gmail.com"

    msg["Subject"] = "Contact from website from %s" % data["from"]
    msg["From"] = "contact@ghislain-rodrigues.fr"
    msg["To"] = me
    msg.add_header("reply-to", data["from"])

    if not validate_email(data["from"]):
        syslog.syslog(syslog.LOG_NOTICE, "mail website,invalid email address,from %s" % data["from"])
        return json.dumps({"error": "invalid email address"}), 400

    result = {}
    s = smtplib.SMTP("localhost")
    try:
        s.sendmail(me, [me], msg.as_string())
        result["result"] = "ok"
    except smtplib.SMTPRecipientsRefused:
        result["code"] = 1
        result["error"] = "All recipients were refused"
        syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPRecipientsRefused,from %s" % data["from"])
    except smtplib.SMTPHeloError:
        result["code"] = 2
        result["error"] = "server error"
        syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPHeloError,from %s" % data["from"])
    except smtplib.SMTPSenderRefused:
        result["code"] = 3
        result["error"] = "invalid from address"
        syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPSenderRefused,from %s" % data["from"])
    except smtplib.SMTPDataError:
        result["code"] = 4
        result["error"] = "unexpected error"
        syslog.syslog(syslog.LOG_NOTICE, "mail website,exception SMTPDataError,from %s" % data["from"])
    s.quit()

    return json.dumps(result), 400 if "error" in result else 200
