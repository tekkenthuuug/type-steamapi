import { SteamPackageGroup } from '../types';
import PackageSub from './PackageSub';

class PackageGroup {
  name;
  title;
  description;
  selectionText;
  saveText;
  displayType;
  isRecurringSubscription;
  subs: PackageSub[];

  constructor(packageGroup: SteamPackageGroup) {
    this.name = packageGroup.name;
    this.title = packageGroup.title;
    this.description = packageGroup.description;
    this.selectionText = packageGroup.selection_text;
    this.saveText = packageGroup.save_text;
    this.displayType = packageGroup.display_type;
    this.isRecurringSubscription = packageGroup.is_recurring_subscription;
    this.subs = packageGroup.subs.map(sub => new PackageSub(sub));
  }
}

export default PackageGroup;
