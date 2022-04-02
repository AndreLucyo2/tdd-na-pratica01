//TDD
// RED - Falha o teste 
// GREEN - justa os erros para rodar
// REFACTORY - refatora para passar no teste


//----------------------------------------------------------------
// A classe diz a intenção , o que eu quero fazer 
// O Metodo  tem o objetivo 
//APP -- CASO DE USO  -----------------------------------------------------------------

type EventStatus = { status: string } //Criando um objeto

class CheckLastEventStatus {

    //Sintaxe typescript  loadLastEventRepository
    constructor(private readonly loadLastEventRepository: I_LoadLastEventRepository) { }

    //Caso de uso: Ajustado para receber um objeto
    async perform({ groupId }: { groupId: string }): Promise<EventStatus> {

        const event = await this.loadLastEventRepository.loadLastEvent({ groupId })

        if (event == undefined) return { status: 'done' }

        const now = new Date()
        return event.endDate > now ? { status: 'active' } : { status: 'inReview' }
    }
}







//INTERFACE ----------------------------------------------------------
//Definir um contrato entre as classes
interface I_LoadLastEventRepository {
    loadLastEvent: (input: { groupId: string }) => Promise<{ endDate: Date } | undefined> //Retorna indefinido ou uma data
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
    output?: { endDate: Date }

    async loadLastEvent({ groupId }: { groupId: string }): Promise<{ endDate: Date } | undefined> {
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

    const groupId = 'any_grou_id'

    //Obtem o evendo pelo ID
    it('Should get last evet data', async () => {

        //Arrange: com factory : recebe o objeto com os objetos
        const { sut, loadLastEventRepository } = makeSut()

        //Action : Caso de uso
        await sut.perform({ groupId })

        //Assert : Teste
        expect(loadLastEventRepository.groupId).to.equal(groupId)

        //teste para não deixar fazer mais de uma chamada
        expect(loadLastEventRepository.callsCount).to.equal(1)

    });

    //Se o grupo nao tem evento retorna o Status é finalizado
    it('Should return status done when group has no event', async () => {

        //Arrange: com factory : recebe o objeto com os objetos
        const { sut, loadLastEventRepository } = makeSut()
        loadLastEventRepository.output = undefined

        //Action : Caso de uso
        const eventStatus = await sut.perform({ groupId })

        //Assert : Teste
        expect(eventStatus.status).to.equal('done')

    });


    //Quando o agora esta antes do final do evento
    //Data de fim do evento esta no futuro
    it('Should return status active when now is before event en time', async () => {

        //Arrange: com factory : recebe o objeto com os objetos
        const { sut, loadLastEventRepository } = makeSut()

        loadLastEventRepository.output = {
            endDate: new Date(new Date().getTime() + 1)//adiciona um mileseg a data atual
        }

        //Action : Caso de uso
        const eventStatus = await sut.perform({ groupId })

        //Assert : Teste
        expect(eventStatus.status).to.equal('active')

    });


    //Quando o agora esta depois do final do evento
    //Data de fim do evento esta no passado
    it('Should return status inReview when now is after event en time', async () => {

        //Arrange: com factory : recebe o objeto com os objetos
        const { sut, loadLastEventRepository } = makeSut()

        loadLastEventRepository.output = {
            endDate: new Date(new Date().getTime() - 1)//adiciona um mileseg a data atual
        }

        //Action : Caso de uso
        const eventStatus = await sut.perform({ groupId })

        //Assert : Teste
        expect(eventStatus.status).to.equal('inReview')

    });

});