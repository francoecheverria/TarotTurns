import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
          fontFamily: {
            sans: ['Figtree', ...defaultTheme.fontFamily.sans],
          },
          colors: {
            'custom-purple': '#17153B',
            'custom-dark-purple': '#2E236C',
            'custom-light-purple': '#433D8B',
            'custom-pink': '#C8ACD6',
            'custom-dark-pink': '#A98DB0',
          },
        },
      },
      plugins: [],
    };