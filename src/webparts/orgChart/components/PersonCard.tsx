import * as React from 'react';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import { IPersonCardProps } from './IPersonCardProps';

const DEFAULT_IMG_WIDTH = 48;
const DEFAULT_IMG_HEIGHT = DEFAULT_IMG_WIDTH;
export default class PersonCard extends React.Component<IPersonCardProps, {}> {

    public render(): React.ReactElement<IPersonCardProps> {
      console.log(this.props.person);
      if(this.props.person == null) {
        return <div>Please select a person!</div>;
      } else {
        return this.renderPerson();
      }
    }

    private getImage(person: IPropertyFieldGroupOrPerson, fgColor: string = 'fffffff', bgColor: string = '878787') {
      if (person.imageUrl == null) {
        return `https://via.placeholder.com/${DEFAULT_IMG_WIDTH}x${DEFAULT_IMG_HEIGHT}/${bgColor}/${fgColor}`;
      } else {
        return person.imageUrl;
      }
    }

    private renderPerson(): React.ReactElement<IPersonCardProps> {
          return (
            <div>
              <div>{this.props.person.fullName}</div>
              <div>{this.props.person.jobTitle}</div>
              <div><img src={this.getImage(this.props.person)}/></div>
            </div>
          );
    }
}