import dark from "./dark.json";
import light from "./light.json";

export const themes = {
    light,
    dark,
};

export type ThemeId = keyof typeof themes;

export default themes;
