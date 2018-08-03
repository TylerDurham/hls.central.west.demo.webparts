declare interface IMeViewerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SizeFieldLabel: string;
  IncludeUserPhotoLabel: string;
}

declare module 'MeViewerWebPartStrings' {
  const strings: IMeViewerWebPartStrings;
  export = strings;
}
