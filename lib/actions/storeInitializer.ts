import useAuthStore from "@/store/authStore";
import axios from "axios";

export const storeInitializer = async () => {
  try {
    useAuthStore.setState({
      status: "loading",
    });
    const { data } = await axios.get(`/api/users`);
    const {
      name,
      email,
      phone,
      address,
      _id,
      role,
      isVerified,
      createdAt,
      updatedAt,
    } = data.result;
    useAuthStore.setState({
      status: "success",
      user: {
        _id,
        name,
        email,
        phone,
        address,
        role,
        isVerified,
        createdAt,
        updatedAt,
      },
    });
  } catch (error: any) {
    console.log(error);
    useAuthStore.setState({
      status: "error",
    });
  }
};
