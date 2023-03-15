import featureAccessModel from "../../database/model/feature-access.model";

class FeatureAccessService {
  findByEmail(email: string) {
    return featureAccessModel.findOne({
      email: email,
    });
  }

  createFeatureAccess(email: string, featureName: string, enable: boolean) {
    return featureAccessModel.create({
      email,
      features: [
        {
          name: featureName,
          enabled: enable,
        },
      ],
    });
  }
}

export default FeatureAccessService;
