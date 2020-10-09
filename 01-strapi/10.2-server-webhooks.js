/*
 * Verify GitHub webhook signature header in Node.js
 * Written by stigok and others (see gist link for contributor comments)
 * https://gist.github.com/stigok/57d075c1cf2a609cb758898c0b202428
 * Licensed CC0 1.0 Universal
 */

const crypto = require('crypto');
const express = require('express');
const exec = require('child_process').exec;

const secretStrapi = 'CHAVE_DO_SEU_WEBHOOK_STRAPI';
const secretNext = 'CHAVE_DO_SEU_WEBHOOK_NEXT';

// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'X-Hub-Signature';

const app = express();
app.use(express.json());

function verifyRouteData(secret) {
  return function verifyPostData(req, res, next) {
    const payload = JSON.stringify(req.body);

    if (!payload) {
      return next('Request body empty');
    }

    const sig = req.get(sigHeaderName) || '';
    const hmac = crypto.createHmac('sha1', secret);
    const digest = Buffer.from(
      'sha1=' + hmac.update(payload).digest('hex'),
      'utf8',
    );
    const checksum = Buffer.from(sig, 'utf8');

    if (
      checksum.length !== digest.length ||
      !crypto.timingSafeEqual(digest, checksum)
    ) {
      return next(
        `Nops!!`,
      );
    }

    return next();
  }
}


app.post('/webhooks/strapi', verifyRouteData(secretStrapi), function (req, res) {
  console.log('OK strapi');
  exec(`git -C /home/luizotavio/blog-strapi/ pull origin master && pm2 restart strapiapi`);
  res.status(200).send('Request body was signed');
});

app.post('/webhooks/next', verifyRouteData(secretNext), function (req, res) {
  console.log('OK next');
  exec(`git -C /home/luizotavio/blog-next/ pull origin master && pm2 restart nextjs`);
  res.status(200).send('Request body was signed');
});


app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.status(403).send('Request body was not signed or verification failed');
});

app.listen(3001);