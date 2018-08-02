import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "MeViewerWebPartStrings";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from "@microsoft/sp-webpart-base";

import { MeViewer, IMeViewerProps } from "./components/MeViewer";
import IMsftGraphUser from "../../models/IMsftGraphUser";
import ServiceFactory from "../../services/ServiceFactory";
import { PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export interface IMeViewerWebPartProps {
  description: string;
  size: PersonaSize;
}

export default class MeViewerWebPart extends BaseClientSideWebPart<IMeViewerWebPartProps> {
  private user: IMsftGraphUser = null;

  public render(): void {
    let element = React.createElement(MeViewer, {
      service: ServiceFactory.createMsfgGraphUserService(this.context.serviceScope),
      size: this.properties.size
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
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
