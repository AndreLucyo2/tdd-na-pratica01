# Anti- Patterns/Code Smells (O não deve fazer!)
- Speculative Generality. (Pense no que precisar somente no momento que realmente precisar)
- Evitar Good Class (Classe que faz muita coisa)
- Divergent Change( precisa de muitas alterações)
- Blank lines (Evitar linhas em branco)
- Improper Instantiation - Instanciamento errado de classe
- High Coupling  - alto clopamento



# Design Patterns/Principles/Conventions (O que é legal fazer)
- You Ain't Gonna Need It (YAGNI). Não faço coisas em quando voce nao precisar
- Single Responsability(SRP)
- Arrange,Act, Assert (AAA) 
   A - cria um bloco para organizar o teste 
   A - Cria uma ação 
   A - Cria uma espectativa para o teste
- Dependency Injection(DI) - tirar a responsabilidade de classe criar a sua instancia
- 