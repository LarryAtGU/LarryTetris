import http from "./http-common";

import { User } from "../components/login";

export class UserDataService {
    getAll() {
      return http.get<Array<number>>("/users");
    }
  
  
    create(data: User) {
      return http.post<User>("/users", data);
    }
  
    delete(id: any) {
        return http.delete<any>(`/users/${id}`);
    }
    
  }
