const MC = require("@kissmybutton/motorcortex");

class Channel extends MC.AttributeChannel {
  constructor(props) {
    super(props);
    this.setComboAttributes({
      goto: ["center", "zoom"]
    });
  }
}

module.exports = Channel;
