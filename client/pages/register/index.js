import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Redux/userSlice";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!name || !email || !password) return;
    const submit = await axios.post("https://xenonstack-backend-project.herokuapp.com/signup/", {
      name,
      email,
      password,
    });
   
    const ans = submit.data.result;
    dispatch(loginSuccess(ans));
    router.push("/");
  };
  return (
    <Container className="my-3">
      <Form>
      
        
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Name"
          />
          <Form.Text className="text-muted">
            We will never share your information with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Email"
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="d-flex">
          <p>Already Registered?</p>
          <Link href="/login">
            <p className="mx-2">Login Here</p>
          </Link>
        </div>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
