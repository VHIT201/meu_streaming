interface EnvConfig {
    devEndPoint: string;
    prodEndPoint? : string
  }
  
  const envConfig: EnvConfig = {
    devEndPoint: 'https://api.themoviedb.org/3/',
    prodEndPoint: 'https://api.themoviedb.org/3/',
  };
  
  const imgPath = 'https://image.tmdb.org/t/p/w500'

  const Config = {
    envConfig,
    imgPath
  };
  
  export default Config;
  