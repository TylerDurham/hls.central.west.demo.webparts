import * as React from 'react';
import styles from './OrgChart.module.scss';
import { IOrgChartProps } from './IOrgChartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import  PersonCard  from './PersonCard';

export default class OrgChart extends React.Component<IOrgChartProps, {}> {
  public render(): React.ReactElement<IOrgChartProps> {
    return (
      <div className={ styles.orgChart }>
        <div>

          <PersonCard person={this.props.person} />

        </div>
      </div>
    );
  }
}
