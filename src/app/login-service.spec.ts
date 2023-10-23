import { AccountRepositoryStub } from "./fake-account-repository"; // Asegúrate de importar el stub
import { LoginService } from "./login-service";
import { Account } from "./account";

describe("Fake fuction isConnect", () => {
  let accountRepository: AccountRepositoryStub;
  let loginService: LoginService;

  const email = "usuario@example.com";
  const account = new Account();
  account.setEmail(email);

  beforeEach(() => {
    accountRepository = new AccountRepositoryStub();
    accountRepository.save(account);
    loginService = new LoginService(accountRepository);
  });

  it("Return true para un email existente en el fake", () => {
    const result = loginService.isConnect(email);
    expect(result).toBe(true);
  });

  it("Return false para un email inexistente en el fake", () => {
    const invaliEmail = "usuario-#@example.com";
    expect(loginService.isConnect(invaliEmail)).toBe(false);
  });
});
