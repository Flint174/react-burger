export function orderStatus(status: string) {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Готов";

    default:
      return status;
  }
}
