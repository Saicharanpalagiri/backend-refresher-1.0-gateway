import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class UserService{
  async getUser(email: string) {
    console.log('statement-3');
    let url = `http://localhost:3000/user/email?email=${email}`;
    let fetchedUser = (await axios.get(url)).data;
    return fetchedUser;
    }

  async signup(body: any) {
    let url = `http://localhost:3000/user/gateway?firstname=${body.firstname}&lastname=${body.lastname}&email=${body.email}&phoneNumber=${body.phoneNumber}&password=${body.password}`;
    console.log(url);
    let createdUser = (await axios.post(url)).data;
    return createdUser;
  }

  async deleteUser(id: number){
    let url = `http://localhost:3000/user/${id}`;
    console.log(url);
    let deletedUser = (await axios.delete(url)).data;
    return deletedUser;
  }

  async findAll(){
    let url = `http://localhost:3000/user/`;
    let deletedUser = (await axios.get(url)).data;
    return deletedUser;
  }

  async findAllContent(){
    let url = `http://localhost:5000/content`;

    let findContent = (await axios.get(url)).data;
    return findContent;
  }


}