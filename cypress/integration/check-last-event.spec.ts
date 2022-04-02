//TDD
// RED - Falha o teste 
// GREEN - justa os erros para rodar
// REFACTORY - refatora para passar no teste


//----------------------------------------------------------------
// A classe diz a intenção , o que eu quero fazer 
// O Metodo  tem o objetivo 
//APP -----------------------------------------------------------------
class CheckLastEventStatus {

    //Sintaxe typescript  loadLastEventRepository
    constructor(private readonly loadLastEventRepository: I_LoadLastEventRepository) { }

    //Caso de uso:
    async perform(groupId: string): Promise<void> {
        await this.loadLastEventRepository.loadLastEvent(groupId);
    }
}




//INTERFACE ----------------------------------------------------------
//Definir um contrato entre as classes
interface I_LoadLastEventRepository {
    loadLastEvent: (groupId: string) => Promise<void>
}





//REPOSITORY ----------------------------------------------------------
//cara que recebe dados de fora, classe que busca dados, para o teste nao importa de onde vem os dados
class LoadLastEventRepositoryMock implements I_LoadLastEventRepository {
    groupId?: string;

    async loadLastEvent(groupId: string): Promise<void> {
        this.groupId = groupId;
    }
}




//TESTE --------------------------------------------
describe('CheckLastEventStatus', () => {
    it('Should get last evet data', async () => {

        //Arrange:
        const loadLastEventRepository = new LoadLastEventRepositoryMock()
        const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository)

        //Action : Caso de uso
        await checkLastEventStatus.perform('any_grou_id')

        //Assert : Teste
        expect(loadLastEventRepository.groupId).to.equal('any_grou_id')

    });

});