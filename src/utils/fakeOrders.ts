import { RequestDataOrders } from "./types";

export const fakeOrders: RequestDataOrders = {
  success: true,
  orders: [
    {
      //   ingredients: ["60d3463f7034a000269f45e9", "60d3463f7034a000269f45e7"],
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9",
      ],
      _id: "",
      status: "done",
      number: 1,
      createdAt: "2021-06-23T20:11:01.403Z",
      updatedAt: "2021-06-23T20:11:01.406Z",
    },
    {
      //   ingredients: ["60d3463f7034a000269f45e9"],
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cc",
      ],
      _id: "",
      status: "done",
      number: 3,
      createdAt: "2021-06-23T20:13:23.654Z",
      updatedAt: "2021-06-23T20:13:23.657Z",
    },
  ],
  total: 2,
  totalToday: 2,
};
