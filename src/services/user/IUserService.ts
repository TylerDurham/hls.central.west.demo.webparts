import IMsftGraphUser from '../../models/IMsftGraphUser';
import IService from '../IService';

export interface IMsftGraphUserService extends IService {
    getMyProfile(): Promise<IMsftGraphUser>;
}