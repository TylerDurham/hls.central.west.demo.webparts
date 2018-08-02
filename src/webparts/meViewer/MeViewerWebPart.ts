import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';


import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { MSGraphClient } from '@microsoft/sp-client-preview';
import { MeViewer, IMeViewerProps } from './components/MeViewer'
import IMsftGraphUser from '../../models/IMsftGraphUser';
import ServiceFactory from '../../services/ServiceFactory';

export interface IMeViewerWebPartProps {
    description: string;
}

export default class MeViewerWebPart extends BaseClientSideWebPart<IMeViewerWebPartProps> {

    user: IMsftGraphUser = null;

    

    public render(): void {
        let element = React.createElement(
            MeViewer, {
                service: ServiceFactory.createUserService(this.context.serviceScope)
            });
        ReactDom.render(element, this.domElement);
    }

    

    private getUserData() {
        return new Promise((resolve, reject) => {
            const graphClient: MSGraphClient = this.context.serviceScope.consume(
                MSGraphClient.serviceKey
              );
    
            graphClient
              .api('/me')
              .select('displayName')
              .get((err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
              });
        });
    }
}

