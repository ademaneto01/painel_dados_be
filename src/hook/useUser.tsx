import { useContext } from "react";
import { UserContext } from "../context";
function useUser() {
  return useContext(UserContext);
}
export default useUser;