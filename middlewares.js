const { parse } = require('path');
const url = require('url');

module.exports = (req, res, next) => {
  const _send = res.send;

  res.send = function (data) {
    const parseUrl = url.parse(req.url);


    const includeTotalCound = req.method === "GET" && parseUrl.query  &&
    (parseUrl.query.includes('_limit') || parseUrl.query.includes('_page') || parseUrl.query.includes('_per_page'));

    if (includeTotalCound) {
      data = JSON.stringify({
        data: JSON.parse(data),
        total: this.getHeader("X-Total-Count") ?? null,
      });
    }

    _send.call(this, data);
  };

  next();
};
