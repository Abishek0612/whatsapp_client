import { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.user);

  //! get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, [dispatch,user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]  overflow-hidden">
      {/* container */}
      <div className="container min-h-screen flex">
        {/* Sidebar */}

        <Sidebar />
      </div>
    </div>
  );
}
