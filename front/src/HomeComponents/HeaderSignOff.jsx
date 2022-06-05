import SignOffBtn from "./SignOffBtn";

const Header = (props) => {
  
  return (
    <div className='navbar'>
      <h1 > {props.titles} </h1>
      <SignOffBtn/>
    </div>
  );
};


export default Header