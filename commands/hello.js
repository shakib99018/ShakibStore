module.exports = {
  config: {
    name: "hello",
    version: "1.0.0",
    author: "Shakib"
  },

  onStart: async function ({ message }) {
    message.reply("Hello! Welcome to ShakibStore.");
  }
};
