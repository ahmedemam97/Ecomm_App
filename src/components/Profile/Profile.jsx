import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";

function Profile() {
  let { userData } = useContext(UserContext);

  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = '';
  if (encodedToken) {
    decodedToken = jwtDecode(encodedToken)
  }
  console.log(userData);

  return <div>
    <h2>Profile</h2>
    <h2>Name : {userData?.user.name}</h2>
    <h2>Email : {userData?.user.email}</h2>
    <h2>Role : {userData?.user.role}</h2>
  </div>;
}

export default Profile;
