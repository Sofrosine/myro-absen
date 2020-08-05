const mainColors = {
  black1: '#1B2749',
  black2: 'rgba(0,0,0,0.6)',
  grey1: '#7F8592',
  grey2: '#DFE0E5',
  grey3: '#F2F2F2',
  red1: '#FA7270',
  red2: '#FA7060',
  blue1: '#00BECE',
  green1: '#20CE31',
  green2: '#3FBD6D',
  white: '#FFFFFF',
  white2: 'rgba(255,255,255,0.6)',
};

export const colors = {
  primary: mainColors.red1,
  secondary: mainColors.black1,
  tersiary: mainColors.grey1,
  quaternary: mainColors.green2,
  background: mainColors.grey3,
  white: mainColors.white,
  whiteTransparent: mainColors.white2,
  button: {
    primary: {
      background: mainColors.red1,
      text: mainColors.white,
      clicked: mainColors.red2,
    },
    secondary: {
      active: {
        background: mainColors.grey2,
        text: mainColors.black1,
      },
      inactive: {
        background: mainColors.grey3,
        text: mainColors.grey1,
      },
    },
  },
  badge: {
    primary: {
      background: mainColors.red1,
    },
    secondary: {
      background: mainColors.blue1,
    },
    tersiary: {
      background: mainColors.green1,
    },
  },
  borderOn: mainColors.grey2,
  loadingBackground: mainColors.black2,
};
