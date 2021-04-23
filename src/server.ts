import express from "express"

import "./database";
import { routes } from "./routes"; 

const app = express()

app.use(express.json());

app.get("/", (request, response) => {
    return response.json({
      message: "Olá NLW 05",
      date: new Date().toISOString()
    })
})
app.use(routes);

app.post("/", (request, response) => {
  return response.json({ message: "Usuario salvo com sucesso!"});
});

app.listen(3333, () => console.log("Server is running on port 3333"));  