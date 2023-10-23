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
Prueba 3: 
Prueba 4: 

Datos de prueba 1 y 2: Para la prueba se requiere de un usuario de tipo string y 
un array tipo Account que contiene la lista de usuarios existentes. 
La prueba requiere del uso del interface AccountRepository en los métodos
getListaConnects() y remove(), por esto el primero se ratifica su return 
y el segundo se verifica que se utilice para la eliminación con éxito. En la prueba 2
no se verifica el remove() porque este nunca se utiliza debido a que no existe el usuario.

Datos de prueba 3 y 4:

Resultados esperados: 
Prueba 1: Se espera un true donde el usuario se elimina de la lista.
Prueba 2: Se espera un false donde el usuario no se elimina de la lista dado que no existe.
Prueba 3: 
Prueba 4: 
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
//Prueba 3

//Prueba 4

});