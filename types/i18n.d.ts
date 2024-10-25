import 'vue-i18n'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    [key: string]: string;
  }

  export interface DefineDateTimeFormat {
    [key: string]: any;
  }

  export interface DefineNumberFormat {
    [key: string]: any;
  }
}

declare module '@vue/runtime-core' {
  import { ComponentCustomProperties } from 'vue'
  import { VueI18n } from 'vue-i18n'

  interface ComponentCustomProperties {
    $t: VueI18n['t'];
  }
}
