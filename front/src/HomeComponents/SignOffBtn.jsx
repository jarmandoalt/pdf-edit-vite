import Cookies from "universal-cookie";

function SignOffBtn() {
  const cookies = new Cookies();

  const signOff = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("lastname", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("team", { path: "/" });
    window.location.href = "./";
  };

  return (
      <button className="divSignOff" onClick={signOff}>Salir</button>
  );
}

export default SignOffBtn;
