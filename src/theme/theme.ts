import * as React from 'react';

export type ThemeProps = {
    textColor?: string | number;
    backgroundColor?: string;
    fontFamily?: string;
}

export type SnackbarThemeType = {
    success?: ThemeProps;
    warning?: ThemeProps;
    danger?: ThemeProps;
    default?: ThemeProps;
    dark?: ThemeProps;
    light?: ThemeProps;
}

export const SnackbarDefaultTheme: SnackbarThemeType = {
    success: {
        backgroundColor: '#92E6A6',
        textColor: '#007725'
    },
    warning: {
        backgroundColor: '#F8D953',
        textColor: '#795400'
    },
    danger: {
        backgroundColor: '#E69292',
        textColor: '#770009'
    },
    default: {
        backgroundColor: '#4D4D4D',
        textColor: '#fff'
    },
    dark: {
        backgroundColor: '#4D4D4D',
        textColor: '#fff'
    },
    light: {
        backgroundColor: '#fcfcfc',
        textColor: '#000'
    },
};

//for theme Context support -- In development
const ContextSnackbarTheme = React.createContext(SnackbarDefaultTheme);

const SnackbarThemeSetting = (personalizeTheme: SnackbarThemeType = SnackbarDefaultTheme): SnackbarThemeType => {
    return personalizeTheme;
};

export const SNACKBARTYPE_SUCCESS = SnackbarThemeSetting().success;
export const SNACKBARTYPE_WARNING = SnackbarThemeSetting().warning;
export const SNACKBARTYPE_DANGER = SnackbarThemeSetting().danger;
export const SNACKBARTYPE_DEFAULT = SnackbarThemeSetting().default;

//For dark and light support
export const SNACKBARTYPE_DARK = SnackbarThemeSetting().dark;
export const SNACKBARTYPE_LIGHT = SnackbarThemeSetting().light;


//export default SnackbarThemeSetting;


