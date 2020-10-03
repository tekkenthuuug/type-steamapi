import { SteamPackageSub } from '../types';

class PackageSub {
  packageId;
  percentSavingsText;
  percentSavings;
  optionText;
  optionDescription;
  canGetFreeLicense;
  isFreeLicense;
  priceInCentsWithDiscount;

  constructor(packageSub: SteamPackageSub) {
    this.packageId = packageSub.packageid;
    this.percentSavings = packageSub.percent_savings;
    this.percentSavingsText = packageSub.percent_savings_text;
    this.optionText = packageSub.option_text;
    this.optionDescription = packageSub.option_description;
    this.canGetFreeLicense = packageSub.can_get_free_license;
    this.isFreeLicense = packageSub.is_free_license;
    this.priceInCentsWithDiscount = packageSub.price_in_cents_with_discount;
  }
}

export default PackageSub;
