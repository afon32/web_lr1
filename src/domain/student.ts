export class Student {
    constructor(
      public id: number,
      public full_name: string,
      public group_name: string,
    ) {}
  
    static fromJson(json: any): Student {
      return new Student(
        json.id,
        json.full_name,
        json.group_name,
      );
    }
  
    toJson(): Record<string, any> {
      return {
        id: this.id,
        full_name: this.full_name,
        group_name : this.group_name,
      };
    }
  }
  