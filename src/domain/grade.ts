export class Grade {
  constructor(
    public id: number,
    public student_name: string,
    public subject: string,
    public grade: number,
    public date: Date
  ) {}

  static fromJson(json: any): Grade {
    return new Grade(
      json.id,
      json.full_name,
      json.subject,
      json.grade,
      new Date(json.date)
    );
  }

//   toJson(): Record<string, any> {
//     return {
//       id: this.id,
//       name: this.name,
//     };
//   }
}
