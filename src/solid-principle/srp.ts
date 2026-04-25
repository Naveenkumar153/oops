/* 
    The "S" in the SOLID principles stands for the Single Responsibility Principle (SRP), which states that a class should have only one reason to change or, in other words, it should have a single, well-defined responsibility or task within a software system.
*/

/*
    PROBLEM: The Employee class has two responsibilities - calculating salary and generating payroll reports
    This creates TIGHT COUPLING - changes to one responsibility may affect the other
    For example, if we change the salary calculation logic, we might also need to change the payroll report generation logic, which violates the Single Responsibility Principle.
*/

class Employee {
    private name!: string;
    private salary!: number;

    // Responsibility 1 — Business/Domain Logic
    public calculateSalary() {
        return this.salary * 12;
    }

    // Responsibility 2 — Reporting / Output Formatting
    public generatePayrollReport() {
        console.log(`Payroll Report for ${this.name}: $${this.salary * 12}`);
    }
};

/* ===== SEPARATION OF CONCERNS (Loosely Coupled) ===== */

/* 
  SOLUTION: Separate the responsibilities into different classes
  This way, changes to salary calculation won't affect payroll report generation and vice versa
*/

class SrpEmployee {
    private name!: string;
    private salary!: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    get getName() {
        return this.name;
    };

    get getSalary() {
        return this.salary;
    };

    // Responsibility 1 — Business/Domain Logic
    public calculateSalary() {
        return this.salary * 12;
    };
};

class PayrollReport {
    // Responsibility 2 — Reporting / Output Formatting
    public generateReport(employee: SrpEmployee) {
        console.log(`Payroll Report for ${employee.getName}: $${employee.calculateSalary()}`);
    };

    public generatePdfReport(employee: SrpEmployee) { 
        // Logic to generate PDF report 
    };

    public generateExcelReport(employee: SrpEmployee) {
        // Logic to generate Excel report 
    };
};

class SalaryCalculator {
    // Responsibility 3 — Salary Calculation Logic
    public calculateAnnualSalary(employee: SrpEmployee) {
        return employee.getSalary * 12;
    };

    // Easy to extend without touching SrpEmployee
    public calculateBonus(employee: SrpEmployee, bonus: number) {
        return employee.getSalary * bonus;
    };
};

// Now, if we need to change the salary calculation logic, we can do so in SalaryCalculator without affecting the PayrollReport class, and vice versa. This adheres to the Single Responsibility Principle and promotes loose coupling between classes.