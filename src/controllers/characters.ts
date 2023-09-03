import axios from "axios";

export class Controller {
  async characters() {
    const RICK_AND_MORTY_API_URL = process.env.API_URL as string;
    const response = await axios.post(RICK_AND_MORTY_API_URL, {
      query: `{ characters { results { id name species } } }`
    });
    const results = response.data.data.characters.results;
    return results;
  }
}



