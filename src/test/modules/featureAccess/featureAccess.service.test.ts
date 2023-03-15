import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import featureAccessModel from "../../../database/model/feature-access.model";
import FeatureAccessService from "../../../modules/featureAccess/featureAccess.service";

let mongoServer: MongoMemoryServer;
const featureAccessService = new FeatureAccessService();

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
    await featureAccessModel.create({
      email: "testuser@gmail.com",
      features: [{ name: "journal", enabled: true }],
    });
  });

  afterAll(async () => {
    await featureAccessModel.deleteMany({});
  });

  it("should return feature access by email with 1 feature with name as chat and enabled = false", async () => {
    const featureAccess = await featureAccessService.findByEmail(
      "jeromykho98@gmail.com"
    );
    expect(featureAccess?.email).toEqual("jeromykho98@gmail.com");
    expect(featureAccess?.features.length).toEqual(1);
    expect(featureAccess?.features.some((obj) => obj.name === "chat")).toBe(
      true
    );
    expect(featureAccess?.features.some((obj) => obj.enabled === false)).toBe(
      true
    );
  });

  it("should return feature access by email with 1 feature with name as journal and enabled = true", async () => {
    const featureAccess = await featureAccessService.findByEmail(
      "testuser@gmail.com"
    );
    expect(featureAccess?.email).toEqual("testuser@gmail.com");
    expect(featureAccess?.features.length).toEqual(1);
    expect(featureAccess?.features.some((obj) => obj.name === "journal")).toBe(
      true
    );
    expect(featureAccess?.features.some((obj) => obj.enabled === true)).toBe(
      true
    );
  });

  it("should create a new feature access with a new email with testing as the name and true for enabled", async () => {
    const featureAccess = await featureAccessService.createFeatureAccess(
      "testacc2@gmail.com",
      "testing",
      true
    );
    expect(featureAccess?.email).toEqual("testacc2@gmail.com");
    expect(featureAccess?.features.length).toEqual(1);
    expect(featureAccess?.features.some((obj) => obj.name === "testing")).toBe(
      true
    );
    expect(featureAccess?.features.some((obj) => obj.enabled === true)).toBe(
      true
    );
  });
});
