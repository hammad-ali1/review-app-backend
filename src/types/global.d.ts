import type { ObjectId } from "mongoose";
export {};
declare global {
  declare namespace GlobalTypes {
    type Employee = {
      empId: number;
      imgURL: string;
      namePrefix: string;
      name: string;
      subject: string;
      designation: string;
      department: string;
      qualifications: Qualification[];
      experience: Experience[];
      ratings: Rating[];
    };

    type Qualification = {
      degree: string;
      institute: string;
      date: string;
    };
    type Experience = {
      designation: string;
      institue: string;
      date: string;
    };
    type Department = {
      name: string;
      employeeCount: number;
      employees: string[];
    };
    type User = {
      email: string;
      password: string;
      name: string;
      isEmailVerified: boolean;
    };
    type Rating = {
      value: number;
      user: ObjectId;
      comments: string;
    };
  }
}
