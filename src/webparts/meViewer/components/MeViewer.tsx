import * as React from "react";
import IMsftGraphUser from "../../../models/IMsftGraphUser";
import { IMsftGraphUserService } from "../../../services/IMsftGraphUserService";
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from "office-ui-fabric-react/lib/Persona";
/**
 * An interface that defines the strongly-typed property bag for the React component.
 */
export interface IMeViewerPropertyBag {
  /**
   * An instance of an IMsftGraphUserService that will be used to fetch user data.
   */
  service: IMsftGraphUserService;
  size: PersonaSize;

  /**
   * A flag that indicates whether the user's photo should be included.
   */
  includeUserPhoto?: boolean;
}
/**
 * An interface that defines the strongly-typed state for the React component.
 */
export interface IMeViewerState {
  /**
   * An instance of an IMsftGraphUser that contains the user's data.
   */
  currentUser: IMsftGraphUser;
}

export class MeViewer extends React.Component<
  IMeViewerPropertyBag,
  IMeViewerState
> {
  /**
   * constructor
   * @param props The property bag passed to the React component by the web part.
   */
  constructor(props: IMeViewerPropertyBag) {
    super(props);
  }

  private fetchData() {
    if (this.props.service) {
      this.props.service
        .getMyProfile({ includePhoto: this.props.includeUserPhoto })
        .then(data => {
          this.setState({ currentUser: data });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  public componentDidMount() {
    this.fetchData();
  }

  public componentDidUpdate(prevProps: IMeViewerPropertyBag) {
    if (prevProps.includeUserPhoto != this.props.includeUserPhoto) {
      this.fetchData();
    }
  }

  public render(): React.ReactElement<IMeViewerPropertyBag> {
    if (this.state == null) {
      return <h3>Loading...</h3>;
    } else {
      let currentUser = this.state.currentUser;

      return (
        <div className="ms-PersonaExample">
          <Persona
            primaryText={currentUser.displayName}
            secondaryText={currentUser.jobTitle}
            tertiaryText={currentUser.officeLocation}
            size={this.props.size}
            presence={PersonaPresence.away}
            imageUrl={currentUser.photoUrl}
          />

          <div>Mobile: {currentUser.mobilePhone}</div>
          <div>Work Phone: {currentUser.businessPhones.join("<br/>")}</div>
        </div>
      );
    }
  }
}
