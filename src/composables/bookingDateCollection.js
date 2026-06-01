import { useApi } from "./axios";

const { backApi, apiAuth } = useApi();

export const bookingDateCollection = () => {
  // ● 向後端新建預約日期列表
  const createBookingData = async (value) => {
    try {
      // console.log("createBookingData_value", value);

      const { data } = await apiAuth.post("/bookingDateCollection", value);
      // console.log("createBookingData_data", data.result);
      // console.log("createBookingData_message", data.message);
    } catch (error) {
      console.log("createBookingData_error", error);
    }
  };

  // ● 向後端取的資料
  const getBookingData = async (id, dateYM) => {
    try {
      const { data } = await backApi.get("/bookingDateCollection", {
        params: {
          dogId: id,
          dateYM,
        },
      });

      // console.log("getBookingData_data_result", data.result);
      // console.log("getBookingData_data_message", data.message);

      return data.result;
    } catch (error) {
      console.log("getBookingData_error", error);
    }
  };

  return {
    createBookingData,
    getBookingData,
  };
};
