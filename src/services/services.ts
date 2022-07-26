import http from "./http-common";

import { User } from "../components/login";
import {score} from "../components/topscore"

type LogInInfo={
  email:string;
  password:string;
}

export class UserDataService {
    getAll() {
      return http.get<Array<number>>("/users");
    }
    signinUser(email:string,password:string) {
      return http.post<LogInInfo>("/users/login",{email:email,password:password})
    }
  
    create(data: User) {
      return http.post<User>("/users", data);
    }
  
    delete(id: any) {
        return http.delete<any>(`/users/${id}`);
    }
    
  }

  export class ScoreDataService{
    getScores() {
      return http.get<Array<score>>("/scores");
    }
    setTopScore(id:number,score:number) {
      return http.post<{id:number,score:number}>("/scores",{id:id,score:score})
    }
  }
