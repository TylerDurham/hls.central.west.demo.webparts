import { SPUserProfileService } from './spo/SPUserProfileService';
import { SPUserProfileServiceMock } from './spo/SPUserProfileServiceMock';
import { IMSGraphUserService } from './IMSGraphUserService';
import { MSGraphUserService } from './msgraph/MSGraphUserService';
import { MSGraphUserServiceMock } from './msgraph/MSGraphUserServiceMock';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import ISPUserProfileService from './ISPUserProfileService';

export default class ServiceFactory{
    public static createMsftGraphUserService(serviceScope: ServiceScope): IMSGraphUserService {
        if(ServiceFactory.isLocal()) {
            return new MSGraphUserServiceMock(serviceScope);
        } else {
            return new MSGraphUserService(serviceScope);
        }
    }

    public static createSpoUserProfileService (serviceScope: ServiceScope): ISPUserProfileService {
        if(ServiceFactory.isLocal()) {
            return new SPUserProfileServiceMock();
        } else {
            return new SPUserProfileService(serviceScope);
        }
    }

    public static isLocal() {
        if(Environment.type === EnvironmentType.Local) {
            return true;
        }
    
        return false;
    }
}

