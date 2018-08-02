import { IMsftGraphUserService } from './IUserService';
import IMsftGraphUser from '../../../lib/models/IMsftGraphUser';

const USERS = require('./MockUserServiceData.json') as IMsftGraphUser[];

export class MockUserService implements IMsftGraphUserService {
    getMyProfile(): Promise<IMsftGraphUser> {
        return new Promise((resolve, reject) => {
            let index = Math.ceil((Math.random() * USERS.length - 1));
            resolve(USERS[index]);
        });
    }
}