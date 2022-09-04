import { createGlobalStyle } from "styled-components";
import LatoRegular from "../fonts/Lato-Regular.ttf";
import LatoBold from "../fonts/Lato-Bold.ttf";
import LatoBlack from "../fonts/Lato-Black.ttf";
import LatoThin from "../fonts/Lato-Thin.ttf";
import LatoLight from "../fonts/Lato-Light.ttf";

const Fonts = createGlobalStyle`
    @font-face {
        font-family: "Lato";
        font-weight: 400;
        font-style: normal;
        src: url(${LatoRegular});
    }

    @font-face {
        font-family: "Lato";
        font-weight: 700;
        font-style: normal;
        src: url(${LatoBold});
    }

    @font-face {
        font-family: "Lato";
        font-weight: 900;
        font-style: normal;
        src: url(${LatoBlack});
    }

    @font-face {
        font-family: "Lato";
        font-weight: 300;
        font-style: normal;
        src: url(${LatoLight});
    }

    @font-face {
        font-family: "Lato";
        font-weight: 100;
        font-style: normal;
        src: url(${LatoThin});
    }

	body {
		font-family: "Lato";
	}
`;

export default Fonts;
