import { ServiceScope } from '@microsoft/sp-core-library';
import ISpoUserProfile from '../../models/ISPUserProfile';
import ISPUserProfileService from '../ISPUserProfileService';
import { SPHttpClient } from '@microsoft/sp-http';

export class SPUserProfileService implements ISPUserProfileService {
    
    private client: SPHttpClient;

    constructor(serviceScope: ServiceScope) {
        this.client = new SPHttpClient(serviceScope);
    }

    public getUserProfile(): ISpoUserProfile {
        return null;
    }
    
    public isMock(): boolean {
        return false;
    }
}
