import { Component, ChangeEvent,useState } from "react";
import { Routes,Route, Link } from "react-router-dom";
import { UserDataService } from "../services/services";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"
import  {setLogin} from '../App'

export type User={
  name:string;
  email:string;
  password:string;
}




const Signup : React.FC<User> = ({name,email, password})=> {


    const [errmsg, setErrorMsg]=useState("Sign up a new user");

    const handleClick  = () => {
        setErrorMsg("")
        if(!input.name) {
            setErrorMsg("Name can't be empty!")
            return;
        }
        if(!input.email) {
            setErrorMsg("Email can't be empty")
            return;
        }
        if(!input.password) {
            setErrorMsg("You need to provide a password")
            return;
        }

        const addUser=(usr:User)=> {
            const service=new UserDataService();
            service.create(usr)
            .then((response: any) => {
                console.log(response.data);
                const newid=parseInt(response.data.id);
                if(newid===-1) {
                    setErrorMsg("The email has been registered already.");
                }
                else {
                    setErrorMsg("You are registered successfully");
                    setLogin(newid);
                    
                }
        
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }
          
        setErrorMsg("Please wait for registration");
        addUser({name:input.name,email:input.email,password:input.password});
    }
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {

        setInput({...input,
            [e.target.name]:e.target.value
        })
    }
        

const [input, setInput] = useState(
    {
        name: "",
        email: "",
        password: "",
    }
)


    return (

        <div className="container w-25">
            <p></p>
        <p className="Error-msg">{errmsg}</p>
        <ul className="list-group">

            <li className="list-group-item">
                <input
                type="text"
                placeholder="User Name"
                value={input.name}
                onChange={handleChange}
                name="name"
                />
            </li>

            <li className="list-group-item">
                <input
                type="text"
                placeholder="Email"
                value={input.email}
                onChange={handleChange}
                name="email"
                />
            </li>

            <li className="list-group-item">
                <input
                type="password"
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
                name="password"
                />
            </li>

            <li className="list-group-item">

                <button
                    className="AddToList-btn"
                    onClick={handleClick}
                >
                    Sign Up 
                </button>
            </li>


        </ul>
    </div>


    )
}


export default class Login extends Component {
  render() {
    return (
      <div >
        <Signup name='' email='' password=''></Signup>
      </div>
    );
  }
}


