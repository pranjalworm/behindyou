
import { Excuses } from "../shared/excuses";

export class ExcusesService {

  // todo: make it smarter based on time of the day and on the basis of failure
  public static fetchExcuse() {

    const max = Excuses.length;
    const index = Math.floor(Math.random() * max);

    return Excuses[index];
  }
}