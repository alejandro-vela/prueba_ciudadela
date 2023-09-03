import { Controller } from "../controllers/characters";
import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const router = express.Router();

const schema = buildSchema(`
  type Character {
    id: Int!
    name: String!
    species: String!
  }
  type Query {
    characters: [Character]
  }
`);

const controller = new Controller();

router.get("/", [], (req: Request, res: Response) =>
  graphqlHTTP({
    schema,
    rootValue: controller,
    graphiql: true,
  })(req, res)
);

export default router;
