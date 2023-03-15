import { Config } from "../entities/config.entity";

const staging = (): Config => {
  return {
    environment: process.env.NODE_ENV || "staging",
    port: process.env.PORT || "",
    mongoDBString: process.env.MONGODB_CONNECTION_STRING || "",
  };
};

export default staging;
