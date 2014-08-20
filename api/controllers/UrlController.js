/**
 * UrlController
 *
 * @description :: Server-side logic for managing Urls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    // Validate that the url has http in front - if not, add it
    var key = req.param('key'),
        target = req.param('target');

    if (target.indexOf('http://') == -1 && target.indexOf('https://') == -1) {
      target = 'http://' + target
    }

    Url.create({key: key, target: target}).exec(function(err, url) {
      return res.send("Shortcut to " + target + " created at " + key);
    })
  },

  shortcut: function(req, res) {
    var key = req.param('key');

    Url.findOne({where: {key: key}}).exec(function(err, url) {
      return res.redirect(url.target);
    })
  }
};
