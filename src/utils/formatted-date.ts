import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativetime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.extend(duration);
dayjs.extend(relativetime);
dayjs.locale("ru");

function dateFormatter(duration: number) {
  switch (duration) {
    case 0:
      return "сегодня";
    case 1:
      return "вчера";

    default:
      return `${dayjs.duration({ days: duration }).humanize()} назад`;
  }
}

export const formattedDate = (date: Date | string) =>
  `${dateFormatter(dayjs(Date.now()).diff(date, "days"))}, ${dayjs(date).format(
    "HH:mm"
  )}`;
