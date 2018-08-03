export default interface IMsftGraphUser {
    id: string;
    businessPhones?: string[];
    displayName: string;
    givenName?: string;
    jobTitle?: string;
    mail?: string;
    mobilePhone?: string;
    officeLocation?: string;
    preferredLanguage?: string;
    surname?: string;
    userPrincipalName: string;
    photoUrl?: string;
}