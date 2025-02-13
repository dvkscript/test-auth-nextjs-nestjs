import React from "react"

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <div
            className="h-full w-full"
            style={{
                backgroundImage: `url("/images/auth/background.svg")`,
                objectFit: "cover",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            {children}
        </div>
    );
};

export default Layout;