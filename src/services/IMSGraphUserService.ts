import IMsftGraphUser from '../models/IMsftGraphUser';
import IService from './IService';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';

export interface IMSGraphUserService extends IService {
    
    getMyProfile(options?: IUserProfileOptions): Promise<IMsftGraphUser>;
}

export interface IUserProfileOptions {
    includePhoto: boolean;
}