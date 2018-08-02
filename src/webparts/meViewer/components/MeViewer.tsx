import * as React from "react";
import IMsftGraphUser from "../../../models/IMsftGraphUser";
import { IMsftGraphUserService } from "../../../services/IMsftGraphUserService";
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export interface IMeViewerProps {
  service: IMsftGraphUserService;
  size: PersonaSize;
}
export interface IMeViewerState {
  currentUser: IMsftGraphUser;
}

export class MeViewer extends React.Component<IMeViewerProps, IMeViewerState> {

  constructor(props: IMeViewerProps) {
    super(props);
  }

  public componentDidMount() {
    if(this.props.service) {
      this.props.service.getMyProfile()
      .then((data) => {
        this.setState({ currentUser: data});
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  public render(): React.ReactElement<IMeViewerProps> {
    if(this.state == null) {
      return (
        <h3>Loading...</h3>
      );
    } else {
      return (
        <div className="ms-PersonaExample">
          <Persona
            primaryText={this.state.currentUser.displayName}
            secondaryText={this.state.currentUser.jobTitle}
            tertiaryText={this.state.currentUser.officeLocation}
            size={this.props.size}
            presence={PersonaPresence.away}
          />
        </div>
      );
    }
  }
}
