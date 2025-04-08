// const globalStyle = {
//     colors: {
//         primary: "#007BFF", // Primary color
//         secondary: "#6C757D", // Secondary color
//         text: "#212529", // Text color
//         hover: "#0056b3", // Hover color
//         button: "#28A745", // Button color
//         buttonHover: "#218838", // Button hover color
//         background: "#FFFFFF", // Background color
//     },
//     fontSize: {
//         primaryText: "16px", // Primary text size
//         secondaryText: "14px", // Secondary text size
//     },
//     button: {
//         size: "12px 20px", // Button size (padding)
//     },
// };

// export default globalStyle;

const globalStyle = {
    colors: {
        primary: "#007BFF",       // Primary brand color (blue)
        primaryLight: "#E6F2FF",  // Light primary variant
        primaryDark: "#0056b3",   // Dark primary variant (hover)
        secondary: "#6C757D",     // Secondary color (gray)
        success: "#28A745",       // Success color (green)
        successDark: "#218838",   // Dark success (button hover)
        danger: "#DC3545",        // Danger/error color (red)
        warning: "#FFC107",       // Warning color (yellow)
        info: "#17A2B8",          // Info color (teal)
        light: "#F8F9FA",         // Light color
        dark: "#343A40",         // Dark color
        
        // Text colors
        text: {
            primary: "#212529",   // Main text color
            secondary: "#6C757D",  // Secondary text
            light: "#F8F9FA",      // Text on dark
            dark: "#343A40",       // Text on light
            inverted: "#FFFFFF",   // Text on colored backgrounds
        },
        
        // Background colors
        background: {
            primary: "#FFFFFF",   // Main background
            secondary: "#F8F9FA",  // Secondary background
            dark: "#343A40",       // Dark background
        },
        
        // Button colors
        button: {
            primary: "#007BFF",
            primaryHover: "#0056b3",
            success: "#28A745",
            successHover: "#218838",
            danger: "#DC3545",
            dangerHover: "#BD2130",
        },
    },
    
    // Typography
    fontSize: {
        base: "16px",            // Base font size
        sm: "14px",               // Small text
        md: "16px",               // Medium (default)
        lg: "18px",               // Large
        xl: "20px",               // Extra large
        xxl: "24px",             // Extra extra large
        heading1: "40px",         // H1 size
        heading2: "32px",         // H2 size
        heading3: "28px",         // H3 size
    },
    
    // Spacing
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
    },
    
    // Buttons
    button: {
        padding: "12px 20px",     // Default button padding
        borderRadius: "4px",       // Default border radius
        border: "none",            // Default border
    },
    
    // Shadows
    shadows: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    },
    
    // Breakpoints
    breakpoints: {
        mobile: "576px",
        tablet: "768px",
        desktop: "992px",
        largeDesktop: "1200px",
    },
};

export default globalStyle;