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

    type AccountancyUser = {
      userName: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      authCode: string;
      DOB: Date;
      title: string;
      businessName: string;
      isAdmin: boolean;
    };

    type Transaction = {
      user: ObjectId;
      nameOfTransaction: string;
      dateOfTransaction: Date;
      inflowOrOutflow: "Inflow" | "Outflow";
      type: "Revenue" | "Other Options";
      fromOrTo: string;
      amount: number;
    };
    type Asset = {
      user: ObjectId;
      item: string;
      category: string;
      condition: string;
      location: string;
      owner: string;
      acquiredDate: Date;
      price: number;
      currentValue: number;
      manufacturer: string;
      series: string;
      inurance: "yes" | "no";
    };
  }
}
