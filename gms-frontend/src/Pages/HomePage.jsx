import { Box } from "@mui/material"
import ResponsiveAppBar from "../Components/Navbar"
import BackgroundImage from "../Components/BackgroundImage"
import OurServices from "../Components/OurServices"
import Schedule from "../Components/Schedule"
import Location from "../Components/Location"
import Footer from "../Components/Footer"


const HomePage = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Box>
                <BackgroundImage />
                <div id="services">
                    <OurServices />
                </div>
                <div id="schedule">
                    <Schedule />
                </div>
                <div id="location">
                    <Location />
                </div>
                <Footer />
            </Box>
        </>
    )
}

export default HomePage