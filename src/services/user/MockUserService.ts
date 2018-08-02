import { IMsftGraphUserService } from './IUserService';
import IMsftGraphUser from '../../../lib/models/IMsftGraphUser';

const USERS: IMsftGraphUser[] = [
    {
        id: '12312312-1234-1234-123123123123',
        displayName: 'William Baumgartner',
        userPrincipalName: 'wbaumgartner@somedomain.com',
        mail: 'wbaumgartner@somedomain.com',
        businessPhones: [
            '(123) 123-1234'
        ],
        jobTitle: 'Senior Developer',
        officeLocation: 'Nashville, TN',
        mobilePhone: '(234) 234-2345'
    },
    {
        id: '12312312-1234-1234-123123123123',
        displayName: 'Gareth Forth',
        userPrincipalName: 'gforth@somedomain.com',
        mail: 'gforth@somedomain.com',
        businessPhones: [
            '(123) 123-1235'
        ],
        jobTitle: 'Senior Accountant',
        officeLocation: 'Nashville, TN',
        mobilePhone: '(234) 234-2346'
    },
    {
        id: '12312312-1234-1234-123123123123',
        displayName: 'Sara Davis',
        userPrincipalName: 'sdavis@somedomain.com',
        mail: 'sdavis@somedomain.com',
        businessPhones: [
            '(123) 123-1236'
        ],
        jobTitle: 'CEO',
        officeLocation: 'Nashville, TN',
        mobilePhone: '(234) 234-2346'
    }
]

export class MockUserService implements IMsftGraphUserService {
    getMyProfile(): Promise<IMsftGraphUser> {
        return new Promise((resolve, reject) => {
            let index = Math.ceil((Math.random() * USERS.length - 1));
            resolve(USERS[index]);
        });
    }
}