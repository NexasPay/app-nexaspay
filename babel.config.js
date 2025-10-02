module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: [
      'babel-preset-expo',
      // ⚠️ MOVER NATIVEWIND PARA AQUI!
      'nativewind/babel',
    ],
    
    plugins: [
      // Manter apenas o Reanimated aqui (ele DEVE ser o último na lista plugins)
      'react-native-reanimated/plugin',
    ],
  };
};