import IMsftGraphUser from '../../../lib/models/IMsftGraphUser';

export interface IMsftGraphUserService {
    getMyProfile(): Promise<IMsftGraphUser>;
}