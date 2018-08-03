import ISpoUserProfile from '../../models/ISPUserProfile';
import ISPUserProfileService from '../ISPUserProfileService';


export class SPUserProfileServiceMock implements ISPUserProfileService {
    
    public getUserProfile(): ISpoUserProfile {
        return null;
    }
    
    public isMock(): boolean {
        return true;
    }
}
