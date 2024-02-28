import useAuthStore from "@/store/authStore";
import axios from "axios";

export const storeInitializer = async () => {
  try {
    useAuthStore.setState({
      status: "loading",
    });
    const { data } = await axios.get(`/api/users`);
    const { name, email, id, role } = data.result;
    useAuthStore.setState({
      status: "success",
      user: {
        id,
        name,
        email,
        role,
      },
    });
  } catch (error: any) {
    console.log(error);
    useAuthStore.setState({
      status: "error",
    });
  }
};
