export interface IUser {
        name: string;
        age: number;
        address: string;
        dob: Date;
        handleClick(): void;
    }

export class User implements IUser {
        public address: string;
        public age: number;
        public dob: Date;
        public name: string;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        public handleClick(): void {
            console.log('age=' + this.age);
            console.log('AEIOU');
        }
}
