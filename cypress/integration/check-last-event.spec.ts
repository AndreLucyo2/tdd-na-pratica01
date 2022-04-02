//TDD
// RED - Falha o teste 
// GREEN - justa os erros para rodar
// REFACTORY - refatora para passar no teste


//----------------------------------------------------------------
//A classe diz a intenção , o que eu quero fazer 
// O Metodo  tem o objetivo 
//APP -----------------------------------------------------------------
class CheckLastEventStatus {

    //Sintaxe typescript  loadLastEventRepository
    constructor(private readonly loadLastEventRepository: LoadLastEventRepository) { }

    async perform(groupId: string): Promise<void> {
    }

}

//REPOSITORY ----------------------------------------------------------
//cara que recebe dados de fora
class LoadLastEventRepository {
    groupId?: string;
}


//TESTE --------------------------------------------
describe('CheckLastEventStatus', () => {
    it('Should get last evet data', async () => {
        //Arrange:
        const loadLastEventRepository = new LoadLastEventRepository()
        const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository)

        //Action
        await checkLastEventStatus.perform('any_grou_id')

        //Assert
        expect(loadLastEventRepository.groupId).to.be('any_grou_id')

    });

});