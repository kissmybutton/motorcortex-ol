const MC = require("@kissmybutton/motorcortex");

class Channel extends MC.AttributeChannel {
  constructor(props) {
    super(props);
    this.setComboAttributes({
      center: ["lat", "lng"]
    });
  }
}

module.exports = Channel;
