class Achievement {
  apiName;
  name;
  description;

  constructor(achievement: {
    apiName: string;
    name: string;
    description?: string;
  }) {
    this.apiName = achievement.apiName;
    this.name = achievement.name;
    this.description = achievement.description;
  }
}

export default Achievement;
