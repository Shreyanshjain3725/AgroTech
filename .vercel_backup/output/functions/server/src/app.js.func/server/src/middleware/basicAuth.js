const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function basicAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="agrotech"');
    return res.status(401).send('Unauthorized');
  }
  const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
  const sep = decoded.indexOf(':');
  const username = sep >= 0 ? decoded.slice(0, sep) : decoded;
  const password = sep >= 0 ? decoded.slice(sep + 1) : '';

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.set('WWW-Authenticate', 'Basic realm="agrotech"');
    return res.status(401).send('Unauthorized');
  }
  req.authUser = user;
  next();
}

module.exports = basicAuth;
