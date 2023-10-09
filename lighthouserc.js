module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000", "http://localhost:3000/projects"],
      startServerCommand: "npm start",
    },
    asserts: {
      preset: "lighthouse:no-pwa",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
