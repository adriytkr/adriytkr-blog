import {DEFAULT_LANGUAGE,LANGUAGES} from '@/shared/constants/languages';

export const LANG_REGEX=LANGUAGES.map(l=>l.code).join('|');
export const DEFAULT_PATH=`/${DEFAULT_LANGUAGE.code}/about`;
