import React from 'react';
import {Button, Text, View} from 'react-native';

const TestScreen = () => {
  const name = 'John';

  let lastName = 'smith';
  lastName = 'Arnold';

  let isRunning: boolean = false;
  isRunning = true;
  isRunning = false;

  let totalValue: number;
  totalValue = 35;

  totalValue = 100.57;

  let totalStudents: any;

  totalStudents = 5000;
  totalStudents = '50';
  totalStudents = true;

  let res: string | number | null | undefined = 'fifty';
  res = 50.0;

  res = null;
  res = undefined;

  let employeeNames: string[] = [];
  employeeNames = ['Rahul', 'Ramesh'];
  console.log(employeeNames);
  employeeNames.push('Rajesh');
  console.log(employeeNames);

  const employeeAge: number[] = [];
  employeeAge.push(45);
  employeeAge.push(70.5);

  const studentData: {
    name: string;
    age: number;
    address: string;
    classes: string[];
  } = {
    name: 'Rahul',
    age: 25,
    address: 'Delhi',
    classes: ['Maths', 'Science'],
  };

  type Employee = {
    name: string;
    age: number;
    id: string;
    salary: number;
  };
  type customString = string;

  const employeeOne: Employee = {
    name: 'John',
    age: 34,
    id: '232432fdvdfvdfv',
    salary: 10000,
  };
  const firstName: customString = 'David';

  interface Student {
    name: string;
    age: number;
  }

  const student1: Student = {
    name: '',
    age: 57,
  };

  enum Directions {
    North = 'North',
    South = 'South',
    East = 'East',
    West = 'West',
  }

  let homeDirection: Directions = Directions.North;
  homeDirection = Directions.South;

  enum Relationship {
    Father = 'FATHER',
    Mother = 'MOTHER',
    Son = 'SON',
    Daughter = 'DAUGHTER',
  }

  const relation: Relationship = Relationship.Mother;

  enum Env {
    dev = 'DEV',
    qa = 'QA',
    Prod = 'PROD',
  }

  const environment: Env = Env.Prod;

  const AddNumbers = (num1: number, num2: number) => {
    const total = num1 + num2;
    console.log('Total', total);
  };
  return (
    <View>
      <Text>Basics</Text>
      <Button title="Add numbers" onPress={() => AddNumbers(5, 12.3)}></Button>
    </View>
  );
};

export default TestScreen;
