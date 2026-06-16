export const environment = {
  production: true,
  url: '',
  // Sin www. En el servidor (oportunalia.com) es mismo origen; en ng serve local llama a producción.
  apiUrl: 'https://oportunalia.com/api',
  apiBase: 'https://oportunalia.com/',
  stripe: {
    publicKey: 'pk_test_51S9VsJDUkaprMyjuCADf4mPAqxZbsk0BUnwS2ph4RuhDFqSQ03mhGeRskRA8rkGuqelBrtVpgUQC73H1gvIeg1YU00oo2uwiVy'
  }
};
