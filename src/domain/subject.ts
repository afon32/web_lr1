export class Subject {
    constructor(
      public id: number,
      public name: string,
    ) {}
  
    static fromJson(json: any): Subject {
      return new Subject(
        json.id,
        json.name,
      );
    }
  
    toJson(): Record<string, any> {
      return {
        id: this.id,
        name: this.name,
      };
    }
  }
  