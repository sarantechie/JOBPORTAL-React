// stylesUtils.js
import globalStyle from './globalStyles';

export const getTextStyle = (size = 'md', color = 'primary') => ({
    fontSize: globalStyle.fontSize[size],
    color: globalStyle.colors.text[color],
});

export const getButtonStyle = (variant = 'primary') => ({
    backgroundColor: globalStyle.colors.button[variant],
    color: globalStyle.colors.text.inverted,
    padding: globalStyle.button.padding,
    borderRadius: globalStyle.button.borderRadius,
    border: globalStyle.button.border,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: globalStyle.colors.button[`${variant}Hover`],
    },
});

export const getSpacing = (size = 'md') => ({
    marginBottom: globalStyle.spacing[size],
});