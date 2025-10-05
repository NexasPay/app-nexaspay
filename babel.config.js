module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      'babel-preset-expo', // Para projetos Expo
      'nativewind/babel',   // Para usar o NativeWind (Tailwind CSS no React Native)
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './', // Alias para a raiz do projeto
          },
        },
      ],
      'react-native-reanimated/plugin',  // Plugin necessário para React Native Reanimated
      [
        'module:react-native-dotenv',    // Para ler variáveis do arquivo .env
        {
          moduleName: '@env',             // Como as variáveis serão importadas
          path: '.env',                   // Caminho para o arquivo .env
        },
      ],
    ],
  };
};
