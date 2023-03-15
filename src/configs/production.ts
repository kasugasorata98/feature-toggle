import { Config } from "../entities/config.entity";

const production = (): Config => {
  return {
    environment: process.env.NODE_ENV || "production",
    port: process.env.PORT || "",
    mongoDBString: process.env.MONGODB_CONNECTION_STRING || "",
  };
};

export default production;
