import { faker } from "@faker-js/faker";
import { promises } from "dns";

export class randomdata {

    GenerateMixedText(length: number): string {
        const CharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnbopqrstuvwxyz' + '0123456789' + '`~!@#$%^&*-_=+{}:;",./<>?'
        const now = new Date(); //creating object for date
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const year = now.getFullYear();
        const month = months[now.getMonth()]; //getMonth() is 0-indexed, matches array
        const day = String(now.getDate()).padStart(2, '0');

        let Currentdate = `${day}-${month}-${year}`;
        let Name = faker.string.fromCharacters(CharSet.split(' '), length);
        return (Name.concat(Currentdate));
    }


    GenerateCurrentDateFormatted(): string {
        const now = new Date(); //creating object for date
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const year = now.getFullYear();
        const month = months[now.getMonth()]; //getMonth() is 0-indexed, matches array
        const day = String(now.getDate()).padStart(2, '0');

        let Currentdate = `${day}-${month}-${year}`;
        return Currentdate;

    }

    GenerateEmailID(){
        return faker.internet.email();
    }



























}