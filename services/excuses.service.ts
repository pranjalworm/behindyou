
import { TimeSlot } from "../shared/enums";
import { Excuses } from "../shared/excuses";
import { Utils } from "./utils.service";

export class ExcuseService {

  // todo: make it smarter based on time of the day and on the basis of failure
  public static fetchExcuse(invalidFormat: boolean) {

    if (invalidFormat) {
      return ExcuseService.getOtherExcuse();

    } else {
      const timeSlot = ExcuseService.getCurrentTimeSlot();
      return ExcuseService.getTimeSlotExcuse(timeSlot);
    }

  }

  static getCurrentTimeSlot() {

    const date = new Date();
    const currentHour = date.getHours()

    if (currentHour >= 6 && currentHour <= 11) {
      return TimeSlot.Morning;

    } else if (currentHour > 11 && currentHour <= 3) {
      return TimeSlot.Afternoon;

    } else if (currentHour > 3 && currentHour <= 6) {
      return TimeSlot.Evening;

    } else {
      return TimeSlot.Night;
    }
  }

  static getTimeSlotExcuse(timeSlot: TimeSlot): string {

    let excuseType;

    switch (timeSlot) {
      case TimeSlot.Morning:
        excuseType = Excuses.Morning;
        break;

      case TimeSlot.Afternoon:
        excuseType = Excuses.Afternoon;
        break;

      case TimeSlot.Evening:
        excuseType = Excuses.Evening;
        break;

      case TimeSlot.Night:
        excuseType = Excuses.Night;
        break;
    }

    const max = excuseType.length;
    const index = Utils.getRandomNumber(max);

    return excuseType[index];
  }

  static getOtherExcuse() {

    const max = Excuses.Other.length;
    const index = Utils.getRandomNumber(max);

    return Excuses.Other[index];
  }

}