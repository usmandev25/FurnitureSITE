import BuildServer from "./app";

const server = BuildServer();

const startServer = () => {
  try {
    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
    const HOST = "localhost";

    server.listen(PORT, HOST, () => {
      console.log(`${new Date()}`);
      console.log(`Server running at http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(`Server crashed: ${error}`);
    process.exit(1);
  }
};

startServer()
