import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#877eff',
        'secondary-500': '#ffb620',
        blue: '#0095f6',
        'logout-btn': '#ff5a5a',
        'navbar-menu':'rgba(16,16,18,0.6)',
        'dark-1': '#000000',
        'dark-2':'#121417',
        'dark-3':'#101012',
        'dark-4': '#1f1f22',
        'light-1': '#ffffff',
        'light-2': '#efefef',
        'light-3':'#7878a3',
        'light-4':'#5c5c78',
        'gray-1':'#697c89',
        glassmorphism: 'rgba(16,16,18,0.6)'
      },
      screens:{
        xs: '400px'
      },
      fontSize:{
        'subtle-medium': [
          "12px",	
          {
            lineHeight: "16px",
            fontWeight: "500",
           },		
         ],
  			'base-regular': [				
          "16px", 
          {				
            lineHeight: "140%",				
            fontWeight: "400",
           },
         ],
  			'heading2-bold': ["30px",{lineHeight: "140%",fontWeight: "700",},],
  			'heading4-medium': [				"20px",				{					lineHeight: "140%",					fontWeight: "500",				},			],
  			'base-semibold': [				"16px",				{					lineHeight: "140%",					fontWeight: "600",				},			],
  			'small-medium': [				"14px",				{					lineHeight: "140%",					fontWeight: "500",				},			],
  			'small-regular': [				"14px",				{				  lineHeight: "140%",				  fontWeight: "400",				},			  ],
  			'tiny-medium': [				"10px",				{				  lineHeight: "140%",				  fontWeight: "500",				},			  ],
  			'small-semibold': [				"14px",				{				  lineHeight: "140%",				  fontWeight: "600",				},			  ],
  			'heading3-bold': [				"24px",				{				  lineHeight: "140%",				  fontWeight: "700",				},			  ],
  			'base-medium': [          "16px",          {            lineHeight: "140%",            fontWeight: "500",          },        ]

      },
      borderRadius:{
        lg: 'var(--radius',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
