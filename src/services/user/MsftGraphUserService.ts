import { IMsftGraphUserService } from './IUserService';
import { MSGraphClient } from '@microsoft/sp-client-preview';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import IMsftGraphUser from '../../models/IMsftGraphUser';

export class MsftGraphUserService implements IMsftGraphUserService {

    private graphClient: MSGraphClient;

    constructor(serviceScope: ServiceScope) {
        this.graphClient = serviceScope.consume(MSGraphClient.serviceKey);
    }

    public getMyProfile(): Promise<IMsftGraphUser> {
        return new Promise<IMsftGraphUser>((resolve, reject) => {
            this.graphClient
                .api("/me")
                .get((err, res) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    isMock(): boolean { return false; }
}