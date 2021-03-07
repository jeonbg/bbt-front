export interface PathItem {
  path: string;
  component: React.ComponentClass<any, any> | React.FunctionComponent<any>;
  exact?: boolean;
}

export const pathList: PathItem[] = [];
