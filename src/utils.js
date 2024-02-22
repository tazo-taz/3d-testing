export const watermarkImageUrl = (
    url,
    target = "/upload/",
    replace = "/upload/w_200,g_south_east,x_5,y_5,l_Myth%20Maker%20AI%20v1:MythMakerAI_Watermark_Small_knmirc_rku7ed/",
    checker = "MythMakerAI_Watermark",
) => {
    if (!url) return null;
    if (url.indexOf(checker) !== -1) return url;
    return url.replace(target, replace);
};