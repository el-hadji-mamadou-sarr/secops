/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.html'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1472px',
        },
        fontFamily: {
            roboto: ['Roboto Serif'],
            aeonik: ['Aeonik', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#1D1D1D',
            white: '#FFFFFF',
            gray: {
                DEFAULT: '#605E5C',
                100: '#F1F1F1',
                200: '#EDFAFD',
            },
            success: {
                DEFAULT: '#00B377',
                100: '#EBFFEE',
                200: '#F0FFF3',
            },
            bleach: {
                DEFAULT: '#EEE5D3',
                100: '#FFFAF4',
                200: '#EFEEEB',
            },
            purple: {
                DEFAULT: '#E3E5FC',
                100: '#E9F0FF',
                200: '#F3F7FF',
            },
            teal: '#007382',
            'sky-blue': '#D7F5FB',
        },
        extend: {
            typography: (theme) => ({
                lg: {
                    css: {
                        h1: {
                            fontSize: '24px',
                        },
                        h2: {
                            fontSize: '20px',
                            margin: '40px 0 20px 0 !important',
                        },
                        h3: {
                            fontSize: '18px',
                        },
                        p: {
                            lineHeight: '28px',
                        },
                        'ol > li::marker': {
                            fontSize: '20px',
                        },
                        li: {
                            margin: '0 0 4px 0 !important',
                        },
                    },
                },
                DEFAULT: {
                    css: {
                        '--tw-prose-bullets': theme('colors.black'),
                        '--tw-prose-counters': theme('colors.black'),
                        color: theme('colors.gray.DEFAULT'),
                        fontSize: '16px',
                        lineHeight: '22px',
                        fontWeight: 400,
                        a: {
                            color: theme('colors.teal'),
                            textDecoration: 'underline',
                            transitionDuration: '300ms',
                            fontWeight: 500,
                            '&:hover': {
                                textDecoration: 'none',
                            },
                        },
                        blockquote: {
                            borderLeftWidth: '4px',
                            borderLeftColor: 'black',
                            fontStyle: 'italic',
                            backgroundColor: '#F0FFF3',
                            padding: '16px',
                        },
                        h1: {
                            fontSize: '22px !important',
                            fontWeight: 500,
                            margin: '24px 0 16px 0 !important',
                            color: theme('colors.black'),
                        },
                        h2: {
                            fontSize: '20px',
                            fontWeight: 500,
                            margin: '24px 0 16px 0 !important',
                            color: theme('colors.black'),
                        },
                        h3: {
                            fontSize: '18px',
                            fontWeight: 500,
                            margin: '0 0 10px 0 !important',
                            color: theme('colors.black'),
                        },
                        h4: {
                            fontSize: '17px',
                            fontWeight: 500,
                            margin: '0 0 10px 0 !important',
                            color: theme('colors.black'),
                        },
                        h5: {
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '20px',
                            margin: '0 0 10px 0 !important',
                            color: theme('colors.black'),
                        },
                        h6: {
                            fontSize: '14px ',
                            fontWeight: 500,
                            margin: '0 0 10px 0',
                            color: theme('colors.black'),
                        },
                        p: {
                            fontSize: '16px',
                            marginTop: '0px !important',
                            color: theme('colors.gray'),
                        },
                        ol:{
                            paddingLeft: '22px !important',
                        },
                        'ol > li::marker': {
                            fontWeight: '500',
                            fontSize: '18px',
                            color: 'var(--tw-prose-bullets)',
                        },
                        'ul > li::marker': {
                            fontWeight: '500',
                        },
                        'li': {
                            fontSize: '16px',
                            lineheight: '22px !important',
                            padding: '0px !important',
                            margin: '0 0 8px 0 !important',

                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
    plugins: ['prettier-plugin-tailwindcss'],
    plugins: [require('@tailwindcss/typography')],
}
