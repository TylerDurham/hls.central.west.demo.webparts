import IService from './IService';
import ISPUserProfile from '../models/ISPUserProfile';

export default interface ISPUserProfileService extends IService {
    getUserProfile(): ISPUserProfile;
}
