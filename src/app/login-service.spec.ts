import { FakeAccountRepository } from "./fake-account-repository";
import { LoginService } from './login-service';
import { AccountRepository } from './account-repository';
import { mock, instance, when, verify } from 'ts-mockito';
import { Account } from './account';

// describe('LoginService', () => {
//   it('should create an instance', () => {
//     expect(new LoginService()).toBeTruthy();
//   });
// });

describe('Disconected test', () => {
  let accountRepository: AccountRepository;
  let ls: LoginService;

  beforeEach(() => {
    accountRepository = mock<AccountRepository>();
    ls = new LoginService(instance(accountRepository));
  });

  /*
  Pruebas de integración

  Objetivos:
  Prueba 1: Verificar que el usuario se elimina ya que es existente.
  Prueba 2: Verificar que el usuario no sea eliminado ya que no existe.

  Datos de prueba 1 y 2: Para la prueba se requiere de un usuario de tipo string y
  un array tipo Account que contiene la lista de usuarios existentes.
  La prueba requiere del uso del interface AccountRepository en los métodos
  getListaConnects() y remove(), por esto el primero se ratifica su return
  y el segundo se verifica que se utilice para la eliminación con éxito. En la prueba 2
  no se verifica el remove() porque este nunca se utiliza debido a que no existe el usuario.

  Resultados esperados:
  Prueba 1: Se espera un true donde el usuario se elimina de la lista.
  Prueba 2: Se espera un false donde el usuario no se elimina de la lista dado que no existe.
  */

  //Prueba 1
  it('Debe retornar true cuando se remueve a un usuario existente de la lista.', () => {
    const usuario = 'eph96@gmail.com';
    const listaUsuarios: Account[] = [
      { getUser: () => 'eph96@gmail.com' } as Account,
    ];
    when(accountRepository.getListaConnects()).thenReturn(listaUsuarios);
    ls.desconnect(usuario);
    verify(accountRepository.remove(listaUsuarios[0])).once();
    expect(ls.desconnect(usuario)).toBe(true);
  });
  //Prueba 2
  it('Debe retornar false cuando se remueve a un usuario no existente de la lista.', () => {
    const usuario = 'eph96@outlook.com';
    const listaUsuarios: Account[] = [
      { getUser: () => 'eph96@gmail.com' } as Account,
    ];
    when(accountRepository.getListaConnects()).thenReturn(listaUsuarios);
    expect(ls.desconnect(usuario)).toBe(false);
  });


  /**
   * Describe del doble de prueba fake de la funcion isConnect de account-repository
   */
  describe("Fake fuction isConnect", () => {
    // variables necesarias para realizar las pruebas de integracion
    let accountRepository: FakeAccountRepository;
    let loginService: LoginService;
    // se crea una cuenta existente con su respectivo email que es agregada a la lista de las cuentas validas en el beforeEach
    const email = "usuario@example.com";
    const account = new Account();
    account.setEmail(email);

    beforeEach(() => {//instancias necesarias para las pruebas
      accountRepository = new FakeAccountRepository();
      accountRepository.save(account);
      loginService = new LoginService(accountRepository);
    });

    /**
     * El nombre de la prueba es true si es un email existente
     * El objetivo es que si el email probado esta en la lista entonces va a mostrar true
     * los datos que se van a usar son la cuenta con su respectivo email la cual va a ser verificada
     * el resultado esperado es que sea verdadero ya que el correo si existe
     */
    it("Return true para un email existente en el fake", () => {
      const result = loginService.isConnect(email);
      expect(result).toBe(true);
    });

    /**
     * El nombre de la prueba es true si es un email no existente
     * El objetivo es que si el email probado no esta en la lista va a mostar false
     * los datos que se van a usar son la cuenta con su respectivo email la cual va a ser verificada
     * el resultado esperado es que sea falso ya que el correo no existe
     */
    it("Return false para un email inexistente en el fake", () => {
      const invaliEmail = "usuario-#@example.com";
      expect(loginService.isConnect(invaliEmail)).toBe(false);
    });
  });


});
