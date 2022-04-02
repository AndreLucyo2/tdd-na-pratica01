# CehcklastEventStatus UseCase

(video)][https://youtu.be/sg1zFpNM5Jw?t=865]

## Dados
*Id de Grupo

## Fluxo primario
1. Obter os dados do ultimo evento do grupo (data de termino e duração do mercado de notas)
2. Retornar status "ativo" se o evento ainda não foi encerrado

## Fluxo alternativo: evento esta no limite do encerramento
2. Retornar status "ativo"
   
## Fluxo alternativo: Evento encerrado, mas esta dentro do periodo de mercado das notas
2. Retornar status "em revisão"

## Fluxo alternativo: Evento e mercado das notas encerrado
2. Retorna estatus "encerrado"

## Fluxo alternativo: Grupo não tem nenhum evendo marcado
2. Retornar status "Encerrado"
