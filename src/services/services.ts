import http from "./http-common";

import { User } from "../components/login";

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
