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
    async perform(groupId: string): Promise<string> {
        await this.loadLastEventRepository.loadLastEvent(groupId)
        return 'done' //primeiro teste de status
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
//Mock = cuisa apenas de entradas
// Spy = cuida de entrada e saida
class LoadLastEventRepositorySpy implements I_LoadLastEventRepository {

    //Entrda
    groupId?: string;
    callsCount = 0 //conta o nmero de chamadas
    //saida
    output: undefined

    async loadLastEvent(groupId: string): Promise<void> {
        this.groupId = groupId;
        this.callsCount++ //Encrementa a cada chamada
        //sempre retorne output
        return this.output
    }
}








//FACTORY----------------------------------------------
//Instancia as classes dependentes
// o factory tambem deve retornar as dependencias
//Retorna uma objeto com os objetos dependencias
type SutOutput = {
    sut: CheckLastEventStatus
    loadLastEventRepository: LoadLastEventRepositorySpy
}
//Fabrica os objetos que preciso para o teste
const makeSut = (): SutOutput => {
    const loadLastEventRepository = new LoadLastEventRepositorySpy()
    const sut = new CheckLastEventStatus(loadLastEventRepository)

    //Retorna uma objeto com os objetos dependencias
    return {
        sut,
        loadLastEventRepository
    }
}











//TESTE --------------------------------------------
describe('CheckLastEventStatus', () => {
    //Obtem o evendo pelo ID
    it('Should get last evet data', async () => {

        //Arrange: com factory : recebe o objeto com os objetos
        const { sut, loadLastEventRepository } = makeSut()

        //Action : Caso de uso
        await sut.perform('any_grou_id')

        //Assert : Teste
        expect(loadLastEventRepository.groupId).to.equal('any_grou_id')

        //teste para não deixar fazer mais de uma chamada
        expect(loadLastEventRepository.callsCount).to.equal(1)

    });

    //Se o grupo nao tem evento retorna o Status é finalizado
    it('Should return status done when group has no event', async () => {

        //Arrange: com factory : recebe o objeto com os objetos
        const { sut, loadLastEventRepository } = makeSut()
        loadLastEventRepository.output = undefined

        //Action : Caso de uso
        const status = await sut.perform('any_grou_id')

        //Assert : Teste
        expect(status).to.equal('done')

    });

});