import useAuthStore from "@/store/authStore";
import axios from "axios";

export const storeInitializer = async () => {
  try {
    useAuthStore.setState({
      status: "loading",
    });
    const { data } = await axios.get(`/api/users`);
    const { name, email, id, role, isVerified } = data.result;
    useAuthStore.setState({
      status: "success",
      user: {
        id,
        name,
        email,
        role,
        isVerified,
      },
    });
  } catch (error: any) {
    console.log(error);
    useAuthStore.setState({
      status: "error",
    });
  }
};
