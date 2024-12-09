import { memo } from "react"
import Header from "../header"
import Footer from "../footer"
import "./style.scss"

const MasterLayout = ({ children, ...props }) => {
    return(
        <div {...props} className="masterLayout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default memo(MasterLayout);