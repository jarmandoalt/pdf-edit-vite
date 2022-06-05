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
    <div className="btnSignOff btnRoot">
      <button onClick={signOff}>Sign Off</button>
    </div>
  );
}

export default SignOffBtn;
