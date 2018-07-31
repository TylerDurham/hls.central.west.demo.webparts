import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'OrgChartWebPartStrings';
import OrgChart from './components/OrgChart';
import { IOrgChartProps } from './components/IOrgChartProps';

import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";

export interface IOrgChartWebPartProps {
  description: string;
  selectedItems: IPropertyFieldGroupOrPerson[];
}

export default class OrgChartWebPart extends BaseClientSideWebPart<IOrgChartWebPartProps> {

  selectedPerson: IPropertyFieldGroupOrPerson;

  public onPropertyPaneFieldChanged(path: string, oldItems: IPropertyFieldGroupOrPerson[], newItems: IPropertyFieldGroupOrPerson[]) {
    
    console.log(`\n\npath: ${path}`);

    switch(path.toUpperCase()) {
      case 'PEOPLE':
        if((oldItems != null && oldItems.length > 0) && ( newItems != null && newItems.length > 0)) {
            //this.properties.selectedItems = newItems; // TODO: Not sure if I need to set this
            this.selectedPerson = newItems[0];
          }
          break;
    }    
  }

  public render(): void {
    const element: React.ReactElement<IOrgChartProps > = React.createElement(
      OrgChart,
      {
        description: this.properties.description,
        person: this.selectedPerson
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                
                PropertyFieldPeoplePicker('people', {
                  label: 'PropertyFieldPeoplePicker',
                  initialData: this.properties.selectedItems,
                  allowDuplicate: false,
                  multiSelect: false,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
