import { Config } from "../entities/config.entity";

const development = (): Config => {
  return {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || "",
    mongoDBString: process.env.MONGODB_CONNECTION_STRING || "",
  };
};

export default development;
