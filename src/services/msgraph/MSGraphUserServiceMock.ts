import {
  IMSGraphUserService,
  IUserProfileOptions
} from "../IMSGraphUserService";
import IMsftGraphUser from "../../models/IMsftGraphUser";
import { ServiceScope, ServiceKey } from "@microsoft/sp-core-library";
import { HttpClient, IHttpClientOptions } from "@microsoft/sp-http";

// Include our mock data generated at https://mockaroo.com/effb0b60
const USERS = require("./MSGraphUserServiceMockData.json") as IMsftGraphUser[];

const DEFAULT_OPTIONS: IUserProfileOptions = { includePhoto: false };

export class MSGraphUserServiceMock implements IMSGraphUserService {
  private httpClient: HttpClient;

  constructor(serviceScope: ServiceScope) {
	this.httpClient = new HttpClient(serviceScope);
  }

  public getMyProfile(options?: IUserProfileOptions): Promise<IMsftGraphUser> {
	options = options == null ? DEFAULT_OPTIONS : options;

	return new Promise((resolve, reject) => {
	  let index = Math.ceil(Math.random() * USERS.length - 1);
	  let user = USERS[index];

	  if (!options.includePhoto) {
		return resolve(user);
	  }

	  let httpOptions: IHttpClientOptions = {
		method: "GET"
	  };

	  this.httpClient
		.fetch("https://placeimg.com/150/150/any", null, httpOptions)
		.then(res => {
		  res.blob().then(blob => {
			user.photoUrl = window.URL.createObjectURL(blob);
			resolve(user);
		  });
		})
		.catch(err => {
		  reject(err);
		});
	});
  }

  private getMyPhoto(user: IMsftGraphUser): any {
	return new Promise((resolve, reject) => {});
  }

  public isMock(): boolean {
	return true;
  }
}
