import {
  IMSGraphUserService,
  IUserProfileOptions
} from "../IMSGraphUserService";
import { MSGraphClient } from "@microsoft/sp-client-preview";
import { ServiceScope, ServiceKey } from "@microsoft/sp-core-library";
import IMsftGraphUser from "../../models/IMsftGraphUser";

const DEFAULT_OPTIONS: IUserProfileOptions = { includePhoto: false };

function getProfile(path: string = "/me") {}

export class MSGraphUserService implements IMSGraphUserService {
  private graphClient: MSGraphClient;

  constructor(serviceScope: ServiceScope) {
    this.graphClient = serviceScope.consume(MSGraphClient.serviceKey);
  }

  private getProfile(path: string = "/me"): Promise<IMsftGraphUser> {
    return new Promise<IMsftGraphUser>((resolve, reject) => {
      this.graphClient.api(path).get((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public getMyProfile(options?: IUserProfileOptions): Promise<IMsftGraphUser> {
    options = options == null ? DEFAULT_OPTIONS : options;
    if (options.includePhoto == false) {
      return this.getProfile();
    } else {
      return new Promise<IMsftGraphUser>((resolve, reject) => {
        Promise.all([this.getProfile(), this.getPhoto()])
          .then(values => {
            let user = <IMsftGraphUser>values[0];
            let blob = <Blob>values[1];

            user.photoUrl = window.URL.createObjectURL(blob);

            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }

  private getPhoto(path: string = "/me"): Promise<Blob> {
    return new Promise<any>((resolve, reject) => {
      this.graphClient
        .api(path + "/photo/$value")
        .responseType("blob")
        .get((err, res, raw) => {
          if (err) {
            reject(err);
          } else {
            resolve(raw.xhr.response);
          }
        });
    });
  }

  public isMock(): boolean {
    return false;
  }
}
