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
        await this.loadLastEventRepository.loadLastEvent(groupId)
        await this.loadLastEventRepository.loadLastEvent(groupId)
    }
}




//INTERFACE ----------------------------------------------------------
//Definir um contrato entre as classes
interface I_LoadLastEventRepository {
    loadLastEvent: (groupId: string) => Promise<void>
}





//REPOSITORY ----------------------------------------------------------
//cara que recebe dados de fora, classe que busca dados, para o teste nao importa de onde vem os dados
// pode alterar esta implanentação... LSP
class LoadLastEventRepositoryMock implements I_LoadLastEventRepository {
    groupId?: string;
    callsCount = 0 //conta o nmero de chamadas

    async loadLastEvent(groupId: string): Promise<void> {
        this.groupId = groupId;
        this.callsCount++ //Encrementa a cada chamada

    }
}




//TESTE --------------------------------------------
describe('CheckLastEventStatus', () => {
    it('Should get last evet data', async () => {

        //Arrange:
        const loadLastEventRepository = new LoadLastEventRepositoryMock()
        const sut = new CheckLastEventStatus(loadLastEventRepository)

        //Action : Caso de uso
        await sut.perform('any_grou_id')

        //Assert : Teste
        expect(loadLastEventRepository.groupId).to.equal('any_grou_id')
        //teste para não deichar fazer mais de uma chamada
        expect(loadLastEventRepository.callsCount).to.equal(2)

    });

});