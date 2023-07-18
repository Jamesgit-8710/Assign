import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUser } from "../slices/users/action";

function Home() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  console.log(state.users.isLoading);
  //   const [name, setName] =
  if (state.users.isLoading) {
    return <div>Loding...</div>;
  }

  return (
    <div>
      <button onClick={() => dispatch(fetchUser())}>click</button>
      {state.users.data &&
        state.users.data.map((e) => (
          <li>
            {e.id}
            {" "}
            {e.title}
          </li>
        ))}
    </div>
  );
}

export default Home;
