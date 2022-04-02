//TDD
// RED - Falha o teste 
// GREEN - justa os erros para rodar
// REFACTORY - refatora para passar no teste


//----------------------------------------------------------------
//A classe diz a intenção , o que eu quero fazer 
// Ometo tem o objetivo 
class CheckLastEventStatus {

    async perform(groupId: string): Promise<void> {


    }

}


//TESTE --------------------------------------------
describe('CheckLastEventStatus', () => {
    it('Should get last evet data', async () => {
        const checkLastEventStatus = new CheckLastEventStatus()

        await checkLastEventStatus.perform('any_grou_id')

    });

});