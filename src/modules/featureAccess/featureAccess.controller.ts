import featureAccessModel, {
  FeatureAccess,
} from "../../database/model/feature-access.model";
import FeatureAccessService from "./featureAccess.service";

class FeatureAccessController {
  private featureAccessService: FeatureAccessService;
  constructor() {
    this.featureAccessService = new FeatureAccessService();
  }
  async handleFeatureAccess(
    email: string,
    featureName: string,
    enable: boolean
  ): Promise<{
    isModified: boolean;
    featureAccess: FeatureAccess;
  }> {
    let isModified = false;
    let featureAccess = await this.featureAccessService.findByEmail(email);
    if (featureAccess) {
      const featureIndex = featureAccess.features.findIndex(
        (feature) => feature.name === featureName
      );
      if (featureIndex !== -1) {
        if (featureAccess.features[featureIndex].enabled !== enable) {
          featureAccess.features[featureIndex].enabled = enable;
          isModified = true;
        }
      } else {
        featureAccess.features.push({
          name: featureName,
          enabled: enable,
        });
        isModified = true;
      }
      featureAccess = await featureAccess.save();
    } else {
      featureAccess = await this.featureAccessService.createFeatureAccess(
        email,
        featureName,
        enable
      );
      isModified = true;
    }
    return {
      isModified,
      featureAccess,
    };
  }

  async getFeatureAccess(
    email: string,
    featureName: string
  ): Promise<boolean | undefined> {
    const featureAccess = await this.featureAccessService.findByEmail(email);
    return featureAccess?.features.find(
      (feature) => feature.name === featureName
    )?.enabled;
  }
}

export default FeatureAccessController;
