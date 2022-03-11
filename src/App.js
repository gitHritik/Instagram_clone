import "./App.css";
import Post from "./component/Post";
import logo from "./Images/logo.jpg";
import p1 from "./Images/1.jpg";
import p2 from "./Images/2.jpg";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
// import { Unsubscribe } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out...
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  //useEffect runs when a specific code run it reacts and only the page is get referesed
  useEffect(() => {
    //Here is the piece of code
    db.collection("posts").onSnapshot((snapshot) => {
      //Every time the new post fired the code run
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src={logo} alt="" />
            </center>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>

      <div className="app__header">
        {/* header */}
        <img src={logo} alt="" />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Sign up</Button>
      )}
      <h1>Welocme</h1>
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
      {/* <Post imageUrl={p1} username="Hritik" caption="Love Your guys" />
      <Post imageUrl={p2} username="Prateek" caption="Nothing man" />
      <Post imageUrl={p1} username="Beliver" caption="Hate you guys" /> */}
    </div>
  );
}

export default App;
