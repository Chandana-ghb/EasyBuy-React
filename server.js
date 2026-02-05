const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// IMPORTANT: use Render's port when deployed
const PORT = process.env.PORT || 5000;

// middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// optional: simple health check
server.get("/", (req, res) => {
  res.json({ message: "JSON Server is running 🚀" });
});

// routes
server.use(router);

// start server
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
