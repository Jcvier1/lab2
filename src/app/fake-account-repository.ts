import { Account } from "./account";
import { AccountRepository } from "./account-repository";
import { Rol } from "./rol";

class AccountRepositoryStub implements AccountRepository {
  private accounts: Array<Account>;
  constructor() {
    this.accounts = [];
  }
  getListaConnects(): Account[] {
    throw new Error("Method not implemented.");
  }
  setListaConnects(cuenta: Account): void {
    throw new Error("Method not implemented.");
  }
  findRol(cuenta: Account): Rol {
    throw new Error("Method not implemented.");
  }
  isBloqueado(cuenta: Account): boolean {
    throw new Error("Method not implemented.");
  }
  remove(cuenta: Account): void {
    throw new Error("Method not implemented.");
  }
  getLista(): Array<Account> {
    return this.accounts;
  }
  save(cuenta: Account): void {
    this.accounts.push(cuenta);
  }
  findAccount(email: string): any {
    const account = this.accounts.find(account => account.email === email);
    return account;
  }
}

export { AccountRepositoryStub };
