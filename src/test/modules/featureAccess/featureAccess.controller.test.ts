import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import featureAccessModel from "../../../database/model/feature-access.model";
import FeatureAccessController from "../../../modules/featureAccess/featureAccess.controller";

let mongoServer: MongoMemoryServer;
const featureAccessController = new FeatureAccessController();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("featureAccessService test", () => {
  beforeAll(async () => {
    await featureAccessModel.create({
      email: "jeromykho98@gmail.com",
      features: [{ name: "chat", enabled: false }],
    });
  });

  afterAll(async () => {
    await featureAccessModel.deleteMany({});
  });

  it("it should update feature access", async () => {
    const { isModified, featureAccess } =
      await featureAccessController.handleFeatureAccess(
        "jeromykho98@gmail.com",
        "lessons",
        true
      );
    expect(featureAccess?.email).toEqual("jeromykho98@gmail.com");
    expect(featureAccess?.features.length).toEqual(2);
    expect(
      featureAccess?.features.some(
        (obj) => obj.name === "chat" && obj.enabled === false
      )
    ).toBe(true);
    expect(
      featureAccess?.features.some(
        (obj) => obj.name === "lessons" && obj.enabled === true
      )
    ).toBe(true);
    expect(isModified).toBe(true);
  });

  it("it should not update feature access", async () => {
    const { isModified, featureAccess } =
      await featureAccessController.handleFeatureAccess(
        "jeromykho98@gmail.com",
        "chat",
        false
      );
    expect(featureAccess?.email).toEqual("jeromykho98@gmail.com");
    expect(
      featureAccess?.features.some(
        (obj) => obj.name === "chat" && obj.enabled === false
      )
    ).toBe(true);
    expect(isModified).toBe(false);
  });

  it("it should create a new feature access", async () => {
    const { isModified, featureAccess } =
      await featureAccessController.handleFeatureAccess(
        "newtest@gmail.com",
        "chat",
        false
      );
    expect(featureAccess?.email).toEqual("newtest@gmail.com");
    expect(featureAccess?.features.length).toEqual(1);
    expect(
      featureAccess?.features.some(
        (obj) => obj.name === "chat" && obj.enabled === false
      )
    ).toBe(true);
    expect(isModified).toBe(true);
  });
});
