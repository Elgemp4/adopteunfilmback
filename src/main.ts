import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "Hello World !"});
})

app.listen(3500, () => {
    console.log("Server started on port 3500");
})