import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event, context):
    """Отправка заявки с формы контактов на почту vankarev@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*'}

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': cors,
            'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False)
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Заполните все поля'}, ensure_ascii=False)
        }

    recipient = 'vankarev@mail.ru'
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка с сайта «Музыка в прозе» от {name}'
    msg['From'] = recipient
    msg['To'] = recipient

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #fafafa;">
        <h2 style="color: #222; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
            Новая заявка с сайта
        </h2>
        <table style="width: 100%; margin-top: 20px;">
            <tr>
                <td style="padding: 8px 0; color: #888; width: 100px;">Имя:</td>
                <td style="padding: 8px 0; color: #333;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #888;">E-mail:</td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:{email}">{email}</a></td>
            </tr>
        </table>
        <div style="margin-top: 20px; padding: 20px; background: #fff; border-left: 3px solid #333;">
            <p style="color: #333; line-height: 1.6; margin: 0;">{message}</p>
        </div>
        <p style="margin-top: 25px; font-size: 12px; color: #aaa;">
            Музыка в прозе · Ночной Ижевск
        </p>
    </div>
    """

    text_part = MIMEText(f"Имя: {name}\nE-mail: {email}\n\nСообщение:\n{message}", 'plain', 'utf-8')
    html_part = MIMEText(html, 'html', 'utf-8')
    msg.attach(text_part)
    msg.attach(html_part)

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(recipient, smtp_password)
        server.sendmail(recipient, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'message': 'Сообщение отправлено'}, ensure_ascii=False)
    }