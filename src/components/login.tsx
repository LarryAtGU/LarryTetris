import { Component, ChangeEvent,useState } from "react";
import React from 'react'
import { Routes,Route, Link } from "react-router-dom";
import { UserDataService } from "../services/services";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

import MainMenu from './mainmenu';
import TopScores from './topscore';
import Config from './config';
import Play from './play';


export type User={
  name:string;
  email:string;
  password:string;
}




    const Signup : React.FC<User> = ({name,email, password})=> {


    const [errmsg, setErrorMsg]=useState("Sign up a new user");

    const [isSignIn, setIsSignIn] = useState(false)
    const [isLogIn, setLogin]=useState(false);
    const [userID,setUserID]=useState(0);

    const handleSigninOrUp = () =>{
        console.log("in handleSigninor up");
        if(isSignIn) { 
            setIsSignIn(false);
            setErrorMsg("Please input your Name, Eamil and password to sign up.")
        }
        else {
            setIsSignIn(true);
            setErrorMsg("Please sign in with your Email and password")
        }
    }

    const SingInorUp = () =>{
        return (
            <div>

                <button
                    className="AddToList-btn"
                    onClick={handleSigninOrUp}
                >
                   {isSignIn ? 'Switch to Sign Up':'Switch to Sign In'}  
                </button>

            </div>
        )
    }

    const handleClick  = () => {
        setErrorMsg("")
        if(!isSignIn&&!input.name) {
            setErrorMsg("Name can't be empty!")
            return;
        }
        if(!input.email) {
            setErrorMsg("Email can't be empty")
            return;
        }
        if(!input.password) {
            setErrorMsg("Password can't be empty")
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
                    setLogin(true);
                    setUserID(newid);
                    
                }
        
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }

        const signinUser=(email:string,password:string)=> {
            const service=new UserDataService();
            service.signinUser(email,password)
            .then((response: any) => {
                console.log(response.data);
                const newid=parseInt(response.data.id);
                if(newid<0) {
                    setErrorMsg(response.data.message);
                }
                else {
                    setErrorMsg("You are signed in successfully");
                    setLogin(true);
                    setUserID(newid);
                    
                }
        
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }


        if(isSignIn) {
            setErrorMsg("Please wait for authentication.");

            signinUser(input.email,input.password);

        } else {
            setErrorMsg("Please wait for registration");
            addUser({name:input.name,email:input.email,password:input.password});
        }
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
        <div >
            {!isLogIn?
            <div className="container w-25">
            <p></p>
        <p className="Error-msg">{errmsg}</p>
        <ul className="list-group">
        {isSignIn?"":
            <li className="list-group-item">
                <input
                type="text"
                placeholder="User Name"
                value={input.name}
                onChange={handleChange}
                name="name"
                />
            </li>
        }
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
                 { isSignIn?'Sign In':'Sign Up'} 
                </button>
            </li>

            <li className="list-group-item">

                <SingInorUp/>
            </li>

        </ul>
        </div>:
  <Routes>
        <Route path="/mainmenu" element={<MainMenu />}> </Route>
        <Route path="/" element={<MainMenu />}> </Route>
        <Route path="/topscores" element={<TopScores />}> </Route>
        <Route path="/config" element={<Config />}> </Route>
        <Route path="/play" element={<Play title={"LTetris"}/>}> </Route>
    </Routes>
    }


    </div>


    )
}

export default class Login extends Component {
//        

    render() {
    return (
      <div >
        <Signup name='' email='' password=''></Signup> 
      </div>
    );
  }
}


