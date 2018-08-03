import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "MeViewerWebPartStrings";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox
} from "@microsoft/sp-webpart-base";

import { MeViewer, IMeViewerPropertyBag } from "./components/MeViewer";
import IMsftGraphUser from "../../models/IMsftGraphUser";
import ServiceFactory from "../../services/ServiceFactory";
import { PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export interface IMeViewerWebPartProps {
  description: string;
  size: PersonaSize;
  includeUserPhoto: boolean;
}

export default class MeViewerWebPart extends BaseClientSideWebPart<IMeViewerWebPartProps> {
  private user: IMsftGraphUser = null;

  public render(): void {

    let element = React.createElement(MeViewer, {
      service: ServiceFactory.createMsftGraphUserService(this.context.serviceScope),
      size: this.properties.size,
      includeUserPhoto: this.properties.includeUserPhoto
    });
    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneCheckbox('includeUserPhoto', {
                  text: strings.IncludeUserPhotoLabel,
                  checked: true
                }),
                PropertyPaneChoiceGroup("size", {
                    label: strings.SizeFieldLabel,
                    options: [
                      { key: 12, text: 'Small' },
                      { key: 13, text: 'Medium', checked: true},
                      { key: 14, text: 'Large' },
                      { key: 15, text: 'X-Large' }
                    ]
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
