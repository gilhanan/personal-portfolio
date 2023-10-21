module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000",
        "http://localhost:3000/projects",
        "http://localhost:3000/about",
        "http://localhost:3000/contact",
        "http://localhost:3000/contact/success",
      ],
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
