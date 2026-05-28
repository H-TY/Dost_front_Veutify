import { useApi } from "./axios";

const { backApi, apiAuth } = useApi();

export const bookingDateCollection = async () => {
  const { data } = await apiAuth.get("/order/all");
  console.log("bookingDateCollection_data_result", data.result);

  // const createBookingDateData = await apiAuth.post(
  //   "/bookingDateCollection",
  //   data,
  // );

  return {
    data,
  };
};
