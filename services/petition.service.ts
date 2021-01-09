export class PetitionService {

  public static processPetition(
    petition: string,
    successCallback: Function,
    errorCallback: Function) {

    try {
      const patternRegex = new RegExp(/\..*\./); // TODO: handle case ad.sdf.adf.asd => .sdf.adf.
      const result = petition.match(patternRegex);

      if (result && result[0]) {
        const answer = result[0].replace(/\./g, '');
        successCallback(answer);

      } else {
        errorCallback()
      }

    } catch (error) {
      errorCallback();
    }
  }
}