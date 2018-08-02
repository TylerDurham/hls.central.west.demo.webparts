import { SPUserProfileService } from './spo/SPUserProfileService';
import { IMsftGraphUserService } from './IMsftGraphUserService';
import { MsftGraphUserService } from './msgraph/MsftGraphUserService';
import { MsftGraphUserServiceMock } from './msgraph/MsftGraphUserServiceMock';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import ISPUserProfileService from './ISPUserProfileService';

export default class ServiceFactory{
    public static createMsfgGraphUserService(serviceScope: ServiceScope): IMsftGraphUserService {
        if(ServiceFactory.isLocal()) {
            return new MsftGraphUserServiceMock();
        } else {
            return new MsftGraphUserService(serviceScope);
        }
    }

    public static createSpoUserProfileService (serviceScope: ServiceScope): ISPUserProfileService {
        if(ServiceFactory.isLocal()) {
            throw new Error('Not implemented! No mock service available for SharePoint User Profiles.');
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

