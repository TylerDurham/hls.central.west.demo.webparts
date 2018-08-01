import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import IMsftGraphUser from "../../../models/IMsftGraphUser";
import { MsftGraphUserService } from "../../../services/user/MsftGraphUserService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IMsftGraphUserService } from "../../../services/user/IUserService";

const DEFAULT_IMG_WIDTH = 48;
const DEFAULT_IMG_HEIGHT = DEFAULT_IMG_WIDTH;

export interface IMeViewerProps {
  service: IMsftGraphUserService;
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
        this.setState({ currentUser: data})
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }

  public render(): React.ReactElement<IMeViewerProps> {

    
    if(this.state == null) {
      return (
        <h3>Loading...</h3>
      )
    } else {
      console.log(this.state);
      return (
        <div>
          <h3>{this.state.currentUser.displayName}</h3>
          <h4>{this.state.currentUser.jobTitle}</h4>
        </div>
      );
    }
  }
}
