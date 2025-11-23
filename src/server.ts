import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Test entrypoint");
});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

export default app;
