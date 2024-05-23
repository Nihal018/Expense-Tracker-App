class Expense {
  constructor(id, title, cost, date: string) {
    this.id = id;
    this.title = title;
    this.cost = cost;
    this.date = new Date(date);
  }
}

export default Expense;
