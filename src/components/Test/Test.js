import { Link, Outlet } from "react-router-dom";

export default function Test() {
  return (
    <div>
      <h1>
        Day la moi nha <br />
        <Link to={""}>Change Route</Link>
        <br />
        <Link to={"b"}>Change Route</Link>
        <br />
        <Link to={"c"}>Change Route</Link>
        <br />
      </h1>

      <h3 style={{ color: "red" }}>
        <Outlet />
      </h3>
    </div>
  );
}
