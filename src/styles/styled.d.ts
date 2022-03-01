import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secundary: string;

      background: string;
      color: string;
      menu: string;
      input: string;
    };
  }
}
