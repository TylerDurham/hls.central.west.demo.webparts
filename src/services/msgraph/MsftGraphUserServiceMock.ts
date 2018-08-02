import { IMsftGraphUserService } from '../IMsftGraphUserService';
import IMsftGraphUser from '../../models/IMsftGraphUser';

// Include our mock data generated at https://mockaroo.com/effb0b60
const USERS = require('./MockUserServiceData.json') as IMsftGraphUser[];

export class MsftGraphUserServiceMock implements IMsftGraphUserService {
    public getMyProfile(): Promise<IMsftGraphUser> {
        return new Promise((resolve, reject) => {
            let index = Math.ceil((Math.random() * USERS.length - 1));
            resolve(USERS[index]);
        });
    }

    public isMock(): boolean { return true; }
}