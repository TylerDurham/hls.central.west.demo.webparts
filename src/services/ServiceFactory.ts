import { IMsftGraphUserService } from './user/IUserService';
import { MsftGraphUserService } from './user/MsftGraphUserService';
import { MockUserService } from './user/MockUserService';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory{
    public static createUserService(serviceScope: ServiceScope): IMsftGraphUserService {
        if(ServiceFactory.isLocal()) {
            return new MockUserService();
        } else {
            return new MsftGraphUserService(serviceScope);
        }
    }

    public static isLocal() {
        if(Environment.type === EnvironmentType.Local) {
            return true;
        }
    
        return false;
    }
}

