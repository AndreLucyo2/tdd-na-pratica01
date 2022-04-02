//TDD
// RED - Falha o teste 
// GREEN - justa os erros para rodar
// REFACTORY - refatora para passar no teste


//----------------------------------------------------------------
//A classe diz a intenção , o que eu quero fazer 
// O Metodo  tem o objetivo 
//APP -----------------------------------------------------------------
class CheckLastEventStatus {

    async perform(groupId: string): Promise<void> {

    }

}

//REPOSITORY ----------------------------------------------------------
class LoadLastEventRepository {

    groupId?: string;

}


//TESTE --------------------------------------------
describe('CheckLastEventStatus', () => {
    it('Should get last evet data', async () => {
        //Arrange:
        const checkLastEventStatus = new CheckLastEventStatus()
        const loadLastEventRepository = new LoadLastEventRepository()

        //Action
        await checkLastEventStatus.perform('any_grou_id')

        //Assert
        expect(loadLastEventRepository.groupId).to.be('any_grou_id')

    });

});